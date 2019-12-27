"use strict";

const isPresent = function(option) {
  return this.includes(option);
};

const optionValue = function(option) {
  return this[this.indexOf(option) + 1];
};

const getParsedArgs = function(userArgs) {
  const isOptionPresent = isPresent.bind(userArgs);
  const getOptionValue = optionValue.bind(userArgs);

  const separator = isOptionPresent("-d") ? getOptionValue("-d") : "\t";
  const fields = isOptionPresent("-f") ? [+getOptionValue("-f")] : undefined;
  const fileNames = userArgs.slice(-1);
  return { separator, fields, fileNames };
};

const getErrorType = function(fileName) {
  const missingFile = `cut: ${fileName}: No such file or directory`;
  const usage = `usage: cut -b list [-n] [file ...]\n       cut -c list [file ...]\n       cut -f list [-s] [-d delim] [file ...]`;
  return { missingFile, usage };
};

const getErrorInArgs = function(userArgs, isExist) {
  const errors = getErrorType(userArgs.fileNames);
  if (userArgs.fields == undefined) return { error: errors.usage };
  if (userArgs.fileNames[0] && !isExist(userArgs.fileNames[0]))
    return { error: errors.missingFile };
  return {};
};

module.exports = { getParsedArgs, getErrorInArgs };
