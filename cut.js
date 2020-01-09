'use strict';

const {createReadStream} = require('fs');

const {stdin, stdout, stderr} = require('process');
const {getParsedArgs} = require('./src/cmdLineArgsHandler');
const {cut} = require('./src/cutOperation');
const StreamReader = require('./src/streamClass');

const display = function (output) {
  stderr.write(output.error);
  stdout.write(output.lines);
};

const main = function () {
  const [, , ...cmdLineArgs] = process.argv;
  const userArgs = getParsedArgs(cmdLineArgs);
  const stdInReader = () => stdin;
  const myStreamReader = new StreamReader(stdInReader, createReadStream);
  cut(userArgs, myStreamReader, display);
};

main();
