const Errors = require("./Errors");
const Token = require("./Token");
const ExpressionBlockNode = require("./Nodes/ExpressionBlockNode");
const PrintNode = require("./Nodes/PrintNode");
const IntNode = require("./Nodes/IntNode");

// Parser class
class Parser {
  constructor(scanner) {
    this.scanner = scanner;
    this.currentToken = new Token();
    this.lookaheadToken = new Token();
    this.lookaheadToken.consumed = true;
  }

  nextToken() {
    let token;
    if (this.lookaheadToken.consumed) {
      token = this.scanner.nextToken();
      // skip comments
      while (
        token === Token.tokens.LINECOMMENT_TOKEN ||
        token === Token.tokens.BLOCKCOMMENT_TOKEN
      ) {
        token = this.scanner.nextToken();
      }
      this.currentToken.type = token;
      this.currentToken.text = this.scanner.currentToken.text;
      return token;
    } else {
      this.currentToken.type = this.lookaheadToken.type;
      this.currentToken.text = this.lookaheadToken.text;
      this.lookaheadToken.consumed = true;
      return this.currentToken.type;
    }
  }

  lookahead() {
    if (this.lookaheadToken.consumed) {
      let token = this.scanner.nextToken();
      // skip comments
      while (
        token === Token.tokens.LINECOMMENT_TOKEN ||
        token === Token.tokens.BLOCKCOMMENT_TOKEN
      ) {
        token = this.scanner.nextToken();
      }
      this.lookaheadToken.type = token;
      this.lookaheadToken.text = this.scanner.currentToken.text;
      this.lookaheadToken.consumed = false;
      return token;
    } else {
      return this.lookaheadToken.type;
    }
  }

  // the entry point of our parser
  parse() {
    let rootBlock = new ExpressionBlockNode();
    this.parseExpressions(rootBlock);
    return rootBlock;
  }

  // to parse a list of expressions
  parseExpressions(expressionBlockNode) {
    while (
      this.lookahead() !== Token.tokens.RIGHTBRACE_TOKEN &&
      this.lookahead() !== Token.tokens.EOS_TOKEN
    ) {
      let expressionNode = this.parseExpression();
      if (expressionNode) {
        expressionBlockNode.push(expressionNode);
      }
    }
  }

  // to parse an expression
  parseExpression() {
    switch (this.lookahead()) {
      case Token.tokens.PRINT_TOKEN:
        let printToken = this.nextToken();
        let expressionNode = this.parseExpression();
        if (expressionNode === undefined) {
          Errors.push({
            type: Errors.SYNTAX_ERROR,
            msg: 'Missing an expression after "print"',
            line: this.scanner.currLine
          });
        }
        return new PrintNode(expressionNode);
      case Token.tokens.INTLITERAL_TOKEN:
        let intToken = this.nextToken();
        return new IntNode(this.currentToken.text);
      default:
        // unexpected, consume it
        this.nextToken();
    }
  }
}

module.exports = Parser;
