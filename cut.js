const fs = require("fs");
const { getParsedArgs, getFieldsToExtract } = require("./src/argumentsHandler");
const { performCutOperation } = require("./src/cutLib");

const main = function() {
  const print = { content: console.log, error: console.error };
  let userArgs = process.argv.slice(2);
  userArgs = getParsedArgs(userArgs);

  userArgs.fields = getFieldsToExtract(userArgs.fields, userArgs.separator);
  performCutOperation(userArgs, fs.readFileSync, print);
};

main();
