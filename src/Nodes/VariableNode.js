const Node = require("./Node");

class VariableNode extends Node {
  constructor(varName, type, initExpressionNode) {
    super();
    this.varName = varName;
    this.type = type;
    this.initExpressionNode = initExpressionNode;
  }
}

module.exports = VariableNode;
