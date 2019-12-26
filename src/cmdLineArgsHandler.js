"use strict";

const getParsedArgs = function(userArgs) {
  const separator = getSeparator(userArgs);
  const fields = [+getField(userArgs)];
  const fileNames = userArgs.slice(-1);
  return { separator, fields, fileNames };
};

const getSeparator = function(userArgs) {
  if (!userArgs.includes("-d")) return "\t";
  return userArgs[userArgs.indexOf("-d") + 1];
};

const getField = function(userArgs) {
  return userArgs[userArgs.indexOf("-f") + 1];
};

module.exports = { getParsedArgs };
