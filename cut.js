'use strict';

const fs = require('fs');
const { getParsedArgs } = require('./src/cmdLineArgsHandler');
const { cut } = require('./src/cutOperation');

const display = function (output) {
  if (output.error) {
    process.stderr.write(output.error);
    return;
  }
  process.stdout.write(output);
};

const main = function () {
  const [, , ...cmdLineArgs] = process.argv;
  const userArgs = getParsedArgs(cmdLineArgs);
  cut(userArgs, fs.readFile, display);
};

main();
