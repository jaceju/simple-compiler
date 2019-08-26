const Node = require("./Node");

class PrintNode extends Node {
  constructor(expressionNode) {
    super();
    this.expressionNode = expressionNode;
  }
}

module.exports = PrintNode;
