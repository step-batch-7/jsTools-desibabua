"use strict";
const {
  getContent,
  getSeparatedFields,
  getFields,
  getReducedLines
} = require("./cutLib");
const { getErrorInArgs } = require("./cmdLineArgsHandler");

const performCut = function(fileContent, userArgs) {
  const separatedFields = getSeparatedFields(fileContent, userArgs.separator);
  const content = getFields(separatedFields, userArgs.fields);
  return getReducedLines(content, userArgs.separator);
};

const cut = function(userArgs, reader, doesExist, display) {
  const doesContainError = getErrorInArgs(userArgs, doesExist);
  if (doesContainError.error) {
    display(doesContainError);
    return;
  }
  const [fileName] = userArgs.fileNames;
  let content = getContent(fileName, reader);
  display(performCut(content, userArgs, display));
  return;
};

module.exports = {
  getContent,
  performCut,
  cut
};
