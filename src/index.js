const fs = require("fs");
const Reader = require("./Reader");
const Scanner = require("./Scanner");
const Token = require("./Token");

function log(str) {
  console.log(str);
}

let dataToBeCompiled = fs.readFileSync("src/example.ws", "utf8");
let reader = new Reader(dataToBeCompiled);
let scanner = new Scanner(reader);

while (true) {
  let token = scanner.nextToken();
  if (token === Token.tokens.EOS_TOKEN) {
    break;
  }
  log("Read token: " + Token.backwardMap[token]);
}
