'use strict';
const {showCutLinesOnStdin} = require('./cutLib');
const {getErrorInArgs} = require('./cmdLineArgsHandler');

const cut = function (userArgs, streamReader, display) {
  const readerStream = streamReader.pick(userArgs.fileNames);
  const error = getErrorInArgs(userArgs);
  if (error) {
    display({error, lines: ''});
    return;
  }
  showCutLinesOnStdin(userArgs, readerStream, display);
};

module.exports = {cut};
