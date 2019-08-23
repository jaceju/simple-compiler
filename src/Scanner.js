// Scanner class
// reader: the reader used to read in characters
const Token = require("./Token");
const Errors = require("./Errors");

class Scanner {
  constructor(reader) {
    this.reader = reader;
    this.currentToken = new Token(); // storing the current analysed token
    this.currLine = 0; // the line number of the current line being read
    this.state = Scanner.START_STATE;
  }

  makeToken(type, text) {
    this.currentToken.type = type;
    this.currentToken.text = text;
    return type;
  }

  nextToken() {
    let bufferStr = "",
      c = "",
      d = "";
    while (true) {
      switch (this.state) {
        case Scanner.START_STATE:
          c = this.reader.nextChar();
          if ((c >= "a" && c <= "z") || (c >= "A" && c <= "Z")) {
            this.state = Scanner.IDENTIFIER_STATE;
            // we need to remember what the token's text is
            bufferStr = c;
          } else {
            switch (c) {
              case ":":
                return this.makeToken(Token.tokens.COLON_TOKEN);
              case ";":
                return this.makeToken(Token.tokens.SEMICOLON_TOKEN);
              case "(":
                return this.makeToken(Token.tokens.LEFTPAREN_TOKEN);
              case ")":
                return this.makeToken(Token.tokens.RIGHTPAREN_TOKEN);
              case "{":
                return this.makeToken(Token.tokens.LEFTBRACE_TOKEN);
              case "}":
                return this.makeToken(Token.tokens.RIGHTBRACE_TOKEN);
              case "%":
                return this.makeToken(Token.tokens.MOD_TOKEN);
              case -1:
                return this.makeToken(Token.tokens.EOS_TOKEN);
              case "\r":
              case "\n":
                this.currLine++;
                break;
              case "!":
                if (this.reader.nextChar() === "=") {
                  return this.makeToken(Token.tokens.NOTEQUAL_TOKEN);
                } else {
                  this.reader.retract();
                  return this.makeToken(Token.tokens.NOT_TOKEN);
                }
              case "+":
                d = this.reader.nextChar();
                if (d === "=") {
                  return this.makeToken(Token.tokens.PLUSASSIGN_TOKEN);
                } else if (d === "+") {
                  return this.makeToken(Token.tokens.PLUSPLUS_TOKEN);
                } else {
                  this.reader.retract();
                  return this.makeToken(Token.tokens.PLUS_TOKEN);
                }
              case "-":
                d = this.reader.nextChar();
                if (d === "=") {
                  return this.makeToken(Token.tokens.MINUSASSIGN_TOKEN);
                } else if (d === "-") {
                  return this.makeToken(Token.tokens.MINUSMINUS_TOKEN);
                } else {
                  this.reader.retract();
                  return this.makeToken(Token.tokens.MINUS_TOKEN);
                }
              case "*":
                return this.makeToken(Token.tokens.MULT_TOKEN);
              case "=":
                if (this.reader.nextChar() === "=") {
                  return this.makeToken(Token.tokens.EQUAL_TOKEN);
                } else {
                  this.reader.retract();
                  return this.makeToken(Token.tokens.ASSIGN_TOKEN);
                }
              case ">":
                if (this.reader.nextChar() === "=") {
                  return this.makeToken(Token.tokens.GREATEREQUAL_TOKEN);
                } else {
                  this.reader.retract();
                  return this.makeToken(Token.tokens.GREATER_TOKEN);
                }
              case "<":
                if (this.reader.nextChar() === "=") {
                  return this.makeToken(Token.tokens.LESSEQUAL_TOKEN);
                } else {
                  this.reader.retract();
                  return this.makeToken(Token.tokens.LESS_TOKEN);
                }
              case "/":
                this.state = Scanner.SLASH_STATE;
                break;
              case "&":
                if (this.reader.nextChar() === "&") {
                  return this.makeToken(Token.tokens.AND_TOKEN);
                } else {
                  this.reader.retract();
                  Errors.push({
                    type: Errors.SYNTAX_ERROR,
                    msg: "You have only one &",
                    line: this.currLine
                  });
                }
                break;
              case "|":
                if (this.reader.nextChar() === "|") {
                  return this.makeToken(Token.tokens.OR_TOKEN);
                } else {
                  this.reader.retract();
                  Errors.push({
                    type: Errors.SYNTAX_ERROR,
                    msg: "You have only one |",
                    line: this.currLine
                  });
                }
                break;
            }
          }
          break;
        case Scanner.IDENTIFIER_STATE:
          c = this.reader.nextChar();
          if ((c >= "a" && c <= "z") || (c >= "A" && c <= "Z")) {
            bufferStr += c;
          } else if (c === -1) {
            return this.makeToken(Token.tokens.EOS_TOKEN);
          } else {
            // stop reading it since it is not a letter anymore
            // retract the last character we read because it does not belong to this identfier
            this.reader.retract();
            // change back the state to read the next token
            this.state = Scanner.START_STATE;
            switch (bufferStr) {
              case "var":
                return this.makeToken(Token.tokens.VAR_TOKEN);
              case "int":
              case "bool":
                //need to pass bufferStr as well to distinguish which type it is
                return this.makeToken(Token.tokens.TYPE_TOKEN, bufferStr);
              case "true":
              case "false":
              case "TRUE":
              case "FALSE":
                return this.makeToken(
                  Token.tokens.BOOLLITERAL_TOKEN,
                  bufferStr
                );
              case "if":
                return this.makeToken(Token.tokens.IF_TOKEN);
              case "else":
                return this.makeToken(Token.tokens.ELSE_TOKEN);
              case "while":
                return this.makeToken(Token.tokens.WHILE_TOKEN);
              case "print":
                return this.makeToken(Token.tokens.PRINT_TOKEN);
              default:
                return this.makeToken(Token.tokens.IDENTIFIER_TOKEN, bufferStr);
            }
          }
          break;
        case Scanner.SLASH_STATE:
          d = this.reader.nextChar();
          if (d === "/") {
            // line comment
            bufferStr = "";
            // reading 1 more char here can prevent the case that a // is followed by a line break char immediately
            d = this.reader.nextChar();
            if (d !== "\r" && d !== "\n") {
              while (d !== "\r" && d !== "\n") {
                bufferStr += d;
                d = this.reader.nextChar();
                if (d === -1) {
                  break;
                }
              }
              // to retract the line break char
              this.reader.retract();
            }
            this.state = Scanner.START_STATE;
            return this.makeToken(Token.tokens.LINECOMMENT_TOKEN, bufferStr);
          } else if (d === "*") {
            // block comment
            bufferStr = "";
            let end = false;
            while (!end) {
              d = this.reader.nextChar();
              if (d !== -1) {
                if (d === "\r" || d === "\n") {
                  this.currLine++;
                }
                if (d === "*") {
                  let e = this.reader.nextChar();
                  if (e === "/") {
                    // meet */
                    end = true;
                  } else {
                    bufferStr += "*" + e;
                  }
                } else {
                  bufferStr += d;
                }
              } else {
                end = true;
              }
            }
            this.state = Scanner.START_STATE;
            return this.makeToken(Token.tokens.BLOCKCOMMENT_TOKEN, bufferStr);
          } else {
            this.state = Scanner.START_STATE;
            this.reader.retract();
            return this.makeToken(Token.tokens.DIV_TOKEN);
          }
      }
    }
  }
}

Scanner.START_STATE = 1; // every FSM should have a start state
Scanner.IDENTIFIER_STATE = Scanner.START_STATE + 1;
Scanner.SLASH_STATE = Scanner.IDENTIFIER_STATE + 1;

module.exports = Scanner;
