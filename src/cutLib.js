"use strict";
const { getSeparatedFields, getFields } = require("./fieldOperation");

const getMessage = function(data, separator) {
  let message = data.content.map(line => line.join(separator));
  if (message.slice(-1) == "") return message.slice(0, -1).join("\n");
  return message.join("\n");
};

const messageFormatter = function(data, print, separator) {
  if (data.error) return print.error(data.error);
  return print.content(getMessage(data, separator));
};

const getContent = function(fileName, fsTools) {
  if (!fsTools.isExist(fileName))
    return { error: `cut: ${fileName}: No such file or directory` };
  let content = fsTools.reader(fileName, "utf8");
  content = content.split("\n");
  return { content };
};

const performCut = function(fileContent, userArgs, print) {
  if (fileContent.content) {
    const separatedFields = getSeparatedFields(fileContent, userArgs.separator);
    const fields = getFields(separatedFields, userArgs.fields);
    return messageFormatter(fields, print, userArgs.separator);
  } else {
    return messageFormatter(fileContent, print, userArgs);
  }
};

const cut = function(userArgs, fsTools, print) {
  const [fileName] = userArgs.fileNames;
  let content = getContent(fileName, fsTools);
  performCut(content, userArgs, print);
};

module.exports = {
  messageFormatter,
  getContent,
  performCut,
  cut,
  getMessage
};
