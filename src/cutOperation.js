'use strict';
const {showCutLinesOnStdin} = require('./cutLib');
const {getErrorInArgs} = require('./cmdLineArgsHandler');

const cut = function (userArgs, reader, display) {
  const error = getErrorInArgs(userArgs);
  if (error) {
    display({error, lines: ''});
    return;
  }
  showCutLinesOnStdin(userArgs, reader, display);
};

const selectReader = function (createReadStream, stdIn, fileName) {
  if (!fileName) {
    return stdIn;
  }
  return createReadStream(fileName);
};

module.exports = {cut, selectReader};
