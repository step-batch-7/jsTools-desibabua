'use strict';

const fs = require('fs');
const { stdout, stderr } = require('process');
const { getParsedArgs } = require('./src/cmdLineArgsHandler');
const { cut } = require('./src/cutOperation');

const display = function (output) {
  stderr.write(output.error);
  stdout.write(output.lines);
};

const main = function () {
  const [, , ...cmdLineArgs] = process.argv;
  const userArgs = getParsedArgs(cmdLineArgs);
  cut(userArgs, fs.readFile, display);
};

main();
