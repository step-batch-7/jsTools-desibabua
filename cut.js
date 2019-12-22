const fs = require("fs");

const messageFormatter = function(data, separator) {
  if (data.error) return data.error;
  return data.content.map(line => line.join(separator)).join("\n");
};

const getFields = function(data, fields) {
  let returnMessage = data.content.map(list =>
    list.filter((word, index) => fields.includes(index + 1))
  );
  return { content: returnMessage };
};

const loadContentsFromStdIn = function(userArgs) {};

const getContent = function(fileName, reader) {
  try {
    let content = reader(fileName, "utf8");
    content = content.split("\n");
    return { content };
  } catch (err) {
    return { error: err.message };
  }
};

const getSeparatedFields = function(data, separator) {
  return {content : data.content.map(line => line.split(separator))};
};

const performCut = function(content, userArgs) {};

const main = function(userArgs, reader) {
  if (userArgs.fileNames) {
    userArgs.fileNames.forEach(fileName => {
      let content = getContent(fileName, reader);
      performCut(content, userArgs);
    });
  }
  loadContentsFromStdIn(userArgs);
};

main({ fileNames: ["a.text"] }, fs.readFileSync);

module.exports = {
  messageFormatter,
  getFields,
  getContent,
  getSeparatedFields
};
