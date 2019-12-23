const fs = require("fs");
const { getParsedArgs } = require("./src/argumentsHandler");
const { getFieldsToExtract, performCutOperation } = require("./src/cutLib");

const main = function() {
  let userArgs = process.argv.slice(2);
  userArgs = getParsedArgs(userArgs);
  userArgs.fields = getFieldsToExtract(userArgs.fields);
  performCutOperation(userArgs, fs.readFileSync);
};

main();
