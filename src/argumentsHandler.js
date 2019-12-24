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

const getRange = function(field) {
  field = field.split("-");
  const firstNumber = +field[0];
  const lastNumber = +field[field.length - 1];
  const range = [];
  for (let i = firstNumber; i <= lastNumber; i++) {
    range.push(i);
  }
  return range;
};

const getFieldsToExtract = function(numberInString, separator) {
  if (separator==="\t") return [1];
  const fields = numberInString.split(",");
  return fields.flatMap(field => getRange(field));
};

module.exports = { getParsedArgs, getFieldsToExtract };
