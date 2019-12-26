"use strict";
const { getSeparatedFields, getFields } = require("./fieldOperation");
const { isValidArgs } = require("./cmdLineArgsHandler");
const { getReducedLines } = require("./messageOperations");

const getContent = function(fileName, reader) {
  let content = reader(fileName, "utf8");
  content = content.split("\n");
  return { content };
};

const performCut = function(fileContent, userArgs, display) {
  const separatedFields = getSeparatedFields(fileContent, userArgs.separator);
  const fields = getFields(separatedFields, userArgs.fields);
  return getReducedLines(fields.content, userArgs.separator);
};

const cut = function(userArgs, fsTools, display) {
  const isError = isValidArgs(userArgs, fsTools.isExist);
  if (isError.error) {
    display(isError);
    return;
  }
  const [fileName] = userArgs.fileNames;
  let content = getContent(fileName, fsTools.reader);
  display(performCut(content, userArgs, display));
  return;
};

module.exports = {
  getContent,
  performCut,
  cut
};
