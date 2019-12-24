const fs = require("fs");
const { getParsedArgs } = require("./src/cmdLineArgsHandler");
const { performCutOperation } = require("./src/cutLib");

const main = function(userArgs) {
  const print = { content: console.log, error: console.error };
  userArgs = getParsedArgs(userArgs.slice(2));
  performCutOperation(userArgs, fs.readFileSync, print);
};

main(process.argv);
