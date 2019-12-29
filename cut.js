'use strict';

const fs = require('fs');
const { getParsedArgs } = require('./src/cmdLineArgsHandler');
const { cut } = require('./src/cutOperation');

const display = function (output) {
  output.error ? process.stderr.write(output.error) : process.stdout.write(output);
};

const main = function () {
  const userArgs = getParsedArgs(process.argv.slice(2));
  cut(userArgs, fs.readFile, display);
};

main();
