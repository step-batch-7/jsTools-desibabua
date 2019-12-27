"use strict";

const fs = require("fs");
const { getParsedArgs } = require("./src/cmdLineArgsHandler");
const { cut } = require("./src/cutLib");

const display = function(output) {
  output.error && console.error(output.error);
  output.content && console.log(output.content);
};

const main = function() {
  const fsTools = { reader: fs.readFileSync, isExist: fs.existsSync };

  const userArgs = getParsedArgs(process.argv.slice(2));
  cut(userArgs, fsTools, display);
};

main();
