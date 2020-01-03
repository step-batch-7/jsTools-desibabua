'use strict';
const {showCutLines, showCutLinesOnStdin} = require('./cutLib');
const {getErrorInArgs} = require('./cmdLineArgsHandler');

const cut = function (userArgs, reader, display) {
  const error = getErrorInArgs(userArgs);
  if (error) {
    display({error, lines: ''});
    return;
  }
  if (!userArgs.fileNames) {
    showCutLinesOnStdin(userArgs, reader, display);
    return;
  }
  showCutLines(userArgs, reader, display);
};

const selectReader = function (fsReader, stdIn, fileName) {
  if (!fileName) {
    return stdIn;
  }
  return fsReader;
};

module.exports = {cut, selectReader};
