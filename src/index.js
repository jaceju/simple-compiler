const fs = require("fs");
const Reader = require("./Reader");
const Scanner = require("./Scanner");
const Token = require("./Token");
const Parser = require("./Parser");
const Errors = require("./Errors");

function log(str) {
  console.log(str);
}

function errorLog(str) {
  console.error(str);
}

let dataToBeCompiled = fs.readFileSync("src/example.ws", "utf8");
let reader = new Reader(dataToBeCompiled);
let scanner = new Scanner(reader);
let parser = new Parser(scanner);

expressionBlockNode = parser.parse();

console.log(expressionBlockNode);

Errors.each(function(error, i) {
  errorLog(
    "Line " + error.line + ": (" + Errors.type[error.type] + ") " + error.msg
  );
});
