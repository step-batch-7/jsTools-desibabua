"use strict";
const { getSeparatedFields, getFields } = require("./fieldOperation");

const getMessage = function(data, separator) {
  if (data.error) return data;
  let message = data.content.map(line => line.join(separator));
  if (message.slice(-1) == "") message = message.slice(0, -1);
  return { content: message.join("\n") };
};

const displayMessage = function(msgToDisplay, print) {
  msgToDisplay.error && print.error(msgToDisplay.error);
  msgToDisplay.content && print.content(msgToDisplay.content);
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
    return getMessage(fields, userArgs.separator);
  } else {
    return getMessage(fileContent, userArgs.separator);
  }
};

const cut = function(userArgs, fsTools, print) {
  const [fileName] = userArgs.fileNames;
  let content = getContent(fileName, fsTools);
  const msgToDisplay = performCut(content, userArgs);
  displayMessage(msgToDisplay, print);
};

module.exports = {
  displayMessage,
  getContent,
  performCut,
  cut,
  getMessage
};
