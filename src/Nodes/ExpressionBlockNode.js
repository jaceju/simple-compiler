const Node = require("./Node");

class ExpressionBlockNode extends Node {
  constructor() {
    super();
    this.expressions = [];
  }

  push(node) {
    this.expressions.push(node);
  }

  iterate(cb) {
    for (let i = 0, l = this.expressions.length; i < l; i++) {
      let expression = this.expressions[i];
      cb(expression, i);
    }
  }
}

module.exports = ExpressionBlockNode;
