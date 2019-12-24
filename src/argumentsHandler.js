"use strict";

const getParsedArgs = function(userArgs) {
  let separator = "\t";
  let fileNames = userArgs.slice(2);
  if (userArgs.includes("-d")) {
    fileNames = userArgs.slice(4);
    separator = userArgs[userArgs.indexOf("-d") + 1];
  }
  let fields = userArgs[userArgs.indexOf("-f") + 1];
  return { separator, fields, fileNames };
};

const getRange = function(field, range = []) {
  const [firstNumber, lastNumber] = [+field.slice(0, 1), +field.slice(-1)];
  for (let number = firstNumber; number <= lastNumber; number++) {
    range.push(number);
  }
  return range;
};

const getFieldsToExtract = function(numberInString, separator) {
  if (separator === "\t") return [1];
  const fields = numberInString.split(",");
  return fields.flatMap(field => getRange(field.split("-")));
};

module.exports = { getParsedArgs, getFieldsToExtract };
