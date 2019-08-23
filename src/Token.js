// Token class
// type: Token's type
// text: the actual text that makes this token, may be null if it is not important

class Token {
  constructor(type, text) {
    this.type = type;
    this.text = text;
  }
}

Token.tokens = {};
Token.tokens.EOS_TOKEN = 1; // end of stream
// using + 1 allows adding a new token easily later
Token.tokens.COLON_TOKEN = Token.tokens.EOS_TOKEN + 1;
Token.tokens.SEMICOLON_TOKEN = Token.tokens.COLON_TOKEN + 1;
Token.tokens.LEFTPAREN_TOKEN = Token.tokens.SEMICOLON_TOKEN + 1;
Token.tokens.RIGHTPAREN_TOKEN = Token.tokens.LEFTPAREN_TOKEN + 1;
Token.tokens.LEFTBRACE_TOKEN = Token.tokens.RIGHTPAREN_TOKEN + 1;
Token.tokens.RIGHTBRACE_TOKEN = Token.tokens.LEFTBRACE_TOKEN + 1;
Token.tokens.MOD_TOKEN = Token.tokens.RIGHTBRACE_TOKEN + 1;
Token.tokens.VAR_TOKEN = Token.tokens.MOD_TOKEN + 1;
Token.tokens.TYPE_TOKEN = Token.tokens.VAR_TOKEN + 1;
Token.tokens.BOOLLITERAL_TOKEN = Token.tokens.TYPE_TOKEN + 1;
Token.tokens.IF_TOKEN = Token.tokens.BOOLLITERAL_TOKEN + 1;
Token.tokens.ELSE_TOKEN = Token.tokens.IF_TOKEN + 1;
Token.tokens.WHILE_TOKEN = Token.tokens.ELSE_TOKEN + 1;
Token.tokens.PRINT_TOKEN = Token.tokens.WHILE_TOKEN + 1;
Token.tokens.IDENTIFIER_TOKEN = Token.tokens.PRINT_TOKEN + 1;
Token.tokens.PLUS_TOKEN = Token.tokens.IDENTIFIER_TOKEN + 1;
Token.tokens.PLUSPLUS_TOKEN = Token.tokens.PLUS_TOKEN + 1;
Token.tokens.PLUSASSIGN_TOKEN = Token.tokens.PLUSPLUS_TOKEN + 1;
Token.tokens.MINUS_TOKEN = Token.tokens.PLUSASSIGN_TOKEN + 1;
Token.tokens.MINUSMINUS_TOKEN = Token.tokens.MINUS_TOKEN + 1;
Token.tokens.MINUSASSIGN_TOKEN = Token.tokens.MINUSMINUS_TOKEN + 1;
Token.tokens.MULT_TOKEN = Token.tokens.MINUSASSIGN_TOKEN + 1;
Token.tokens.DIV_TOKEN = Token.tokens.MULT_TOKEN + 1;
Token.tokens.ASSIGN_TOKEN = Token.tokens.DIV_TOKEN + 1;
Token.tokens.EQUAL_TOKEN = Token.tokens.ASSIGN_TOKEN + 1;
Token.tokens.NOTEQUAL_TOKEN = Token.tokens.EQUAL_TOKEN + 1;
Token.tokens.GREATER_TOKEN = Token.tokens.NOTEQUAL_TOKEN + 1;
Token.tokens.GREATEREQUAL_TOKEN = Token.tokens.GREATER_TOKEN + 1;
Token.tokens.LESS_TOKEN = Token.tokens.GREATEREQUAL_TOKEN + 1;
Token.tokens.LESSEQUAL_TOKEN = Token.tokens.LESS_TOKEN + 1;
Token.tokens.AND_TOKEN = Token.tokens.LESSEQUAL_TOKEN + 1;
Token.tokens.OR_TOKEN = Token.tokens.AND_TOKEN + 1;
Token.tokens.NOT_TOKEN = Token.tokens.OR_TOKEN + 1;
Token.tokens.LINECOMMENT_TOKEN = Token.tokens.NOT_TOKEN + 1;
Token.tokens.BLOCKCOMMENT_TOKEN = Token.tokens.LINECOMMENT_TOKEN + 1;
Token.backwardMap = {}; // for inverse look-up

for (let x in Token.tokens) {
  if (Token.tokens.hasOwnProperty(x)) {
    Token.backwardMap[Token.tokens[x]] = x;
  }
}

module.exports = Token;
