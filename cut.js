"use strict";

const fs = require("fs");
const { getParsedArgs } = require("./src/cmdLineArgsHandler");
const { cut } = require("./src/cutLib");

const main = function(userArgs) {
  const print = { content: console.log, error: console.error };
  userArgs = getParsedArgs(userArgs.slice(2));
  cut(userArgs, fs.readFileSync, print);
};

main(process.argv);
