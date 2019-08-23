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
Token.backwardMap = {}; // for inverse look-up

for (let x in Token.tokens) {
  if (Token.tokens.hasOwnProperty(x)) {
    Token.backwardMap[Token.tokens[x]] = x;
  }
}

module.exports = Token;
