"use strict";

const fs = require("fs");
const { getParsedArgs } = require("./src/cmdLineArgsHandler");
const { cut } = require("./src/cutLib");

const display = function(output) {
  output.error ? console.error(output.error) : console.log(output);
};

const main = function() {
  const userArgs = getParsedArgs(process.argv.slice(2));
  cut(userArgs, fs.readFileSync, fs.existsSync, display);
};

main();
