'use strict';

const fs = require('fs');

const {stdin, stdout, stderr} = require('process');
const {getParsedArgs} = require('./src/cmdLineArgsHandler');
const {cut, selectReader} = require('./src/cutOperation');

const display = function (output) {
  stderr.write(output.error);
  stdout.write(output.lines);
};

const main = function () {
  const [, , ...cmdLineArgs] = process.argv;
  const userArgs = getParsedArgs(cmdLineArgs);
  const reader = selectReader(fs.readFile, stdin, userArgs.fileNames);
  cut(userArgs, reader, display);
};

main();
