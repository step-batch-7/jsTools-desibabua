"use strict";

const getMessage = function(data, separator) {
  let message = data.content.map(line => line.join(separator));
  if (message.slice(-1) == "") return message.slice(0, -1).join("\n");
  return message.join("\n");
};

const messageFormatter = function(data, print, separator) {
  if (data.error) {
    return print.error(data.error);
  }
  return print.content(getMessage(data, separator));
};

const getFields = function(data, fields) {
  let returnMessage = data.content.map(list =>
    list.filter((word, index) => fields.includes(index + 1))
  );
  return { content: returnMessage };
};

const getContent = function(fileName, fsTools) {
  if (!fsTools.isExist(fileName))
    return { error: `cut: ${fileName}: No such file or directory` };
  let content = fsTools.reader(fileName, "utf8");
  content = content.split("\n");
  return { content };
};

const getSeparatedFields = function(data, separator) {
  return { content: data.content.map(line => line.split(separator)) };
};

const performCut = function(contentOfFile, userArgs, print) {
  if (contentOfFile.content) {
    const separatedFields = getSeparatedFields(
      contentOfFile,
      userArgs.separator
    );
    const fields = getFields(separatedFields, userArgs.fields);
    return messageFormatter(fields, print, userArgs.separator);
  } else {
    return messageFormatter(contentOfFile, print, userArgs);
  }
};

const cut = function(userArgs, fsTools, print) {
  const [fileName] = userArgs.fileNames;
  let content = getContent(fileName, fsTools);
  performCut(content, userArgs, print);
};

module.exports = {
  messageFormatter,
  getFields,
  getContent,
  getSeparatedFields,
  performCut,
  cut,
  getMessage
};
