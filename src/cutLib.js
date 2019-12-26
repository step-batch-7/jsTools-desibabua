"use strict";
const { getSeparatedFields, getFields } = require("./fieldOperation");
const { getReducedLines } = require("./messageOperations");

const getContent = function(fileName, fsTools) {
  if (!fsTools.isExist(fileName))
    return { error: `cut: ${fileName}: No such file or directory` };
  let content = fsTools.reader(fileName, "utf8");
  content = content.split("\n");
  return { content };
};

const performCut = function(fileContent, userArgs) {
  if (fileContent.content) {
    const separatedFields = getSeparatedFields(fileContent, userArgs.separator);
    const fields = getFields(separatedFields, userArgs.fields);
    return getReducedLines(fields, userArgs.separator);
  }
  return getReducedLines(fileContent);
};

const cut = function(userArgs, fsTools) {
  if(userArgs.fields.error) return performCut(userArgs.fields)
  const [fileName] = userArgs.fileNames;
  let content = getContent(fileName, fsTools);
  return performCut(content, userArgs);
};

module.exports = {
  getContent,
  performCut,
  cut
};
