"use strict";

const getParsedArgs = function(userArgs) {
  let separator = "\t";
  let fileNames = userArgs.slice(2);
  if (userArgs.includes("-d")) {
    fileNames = userArgs.slice(4);
    separator = getOptionValue(userArgs, "-d");
  }

  let fields = [+getOptionValue(userArgs, "-f")];
  return { separator, fields, fileNames };
};

const getOptionValue = function(userArgs, option) {
  return userArgs[userArgs.indexOf(option) + 1];
};

module.exports = { getParsedArgs };
