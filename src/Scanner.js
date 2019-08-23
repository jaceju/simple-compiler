// Scanner class
// reader: the reader used to read in characters
const Token = require("./Token");

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
    while (true) {
      switch (this.state) {
        case Scanner.START_STATE:
          let c = this.reader.nextChar();
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
          }
          break;
      }
    }
  }
}

Scanner.START_STATE = 1; // every FSM should have a start state

module.exports = Scanner;
