'use strict';
const { showCutLines } = require('./cutLib');
const { getErrorInArgs } = require('./cmdLineArgsHandler');

const cut = function (userArgs, reader, display) {
  const error = getErrorInArgs(userArgs);

  if (error) {
    display({ error });
    return;
  }
  showCutLines(userArgs, reader, display);
};

module.exports = {
  cut
};
