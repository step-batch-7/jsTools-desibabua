"use strict";

const getParsedArgs = function(userArgs) {
  const separator = getSeparator(userArgs);
  const fields = getField(userArgs);
  const fileNames = userArgs.slice(-1);
  return { separator, fields, fileNames };
};

const getSeparator = function(userArgs) {
  const indexOfSeparator = getIndexOf(userArgs, "-d");
  if (indexOfSeparator == -1) return "\t";
  return userArgs[indexOfSeparator + 1];
};

const getField = function(userArgs) {
  const indexOfField = getIndexOf(userArgs, "-f");
  if (indexOfField != -1) return [+userArgs[indexOfField + 1]];
  return {
    error: `usage: cut -b list [-n] [file ...]
    cut -c list [file ...]
    cut -f list [-s] [-d delim] [file ...]`
  };
};

const getIndexOf = function(userArgs, option) {
  return userArgs.indexOf(option);
};

module.exports = { getParsedArgs };
