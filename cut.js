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

const getContent = function(fileName, reader) {
  try {
    let content = reader(fileName, "utf8");
    content = content.split("\n");
    return { content };
  } catch (err) {
    return { error: [err.message] };
  }
};

const getSeparatedFields = function(data, separator) {
  return { content: data.content.map(line => line.split(separator)) };
};

const getParsedArgs = function(userArgs) {
  let parsedArgs = {};
  const indexOfSeparator = userArgs.lastIndexOf("-d") + 1;
  const indexOfField = userArgs.lastIndexOf("-f") + 1;
  const indexOfFirstFile =
    indexOfField > indexOfSeparator ? indexOfField + 1 : indexOfSeparator + 1;

  if (userArgs.includes("-d"))
    parsedArgs.separator = userArgs[indexOfSeparator];

  parsedArgs.fields = userArgs[indexOfField];
  parsedArgs.fileNames = userArgs.splice(indexOfFirstFile);
  return parsedArgs;
};

const performCut = function(contentOfFile, userArgs) {
  if (contentOfFile.content) {
    const separatedFields = getSeparatedFields(
      contentOfFile,
      userArgs.separator
    );
    const fields = getFields(separatedFields, userArgs.fields);
    return messageFormatter(fields, userArgs.separator);
  } else {
    return messageFormatter(contentOfFile, userArgs);
  }
};

const getFieldsToExtract = function(numberInString) {
  return [Number(numberInString)];
};

const performCutOperation = function(userArgs, reader) {
  if (userArgs.fileNames) {
    userArgs.fileNames.forEach(fileName => {
      let content = getContent(fileName, reader);
      performCut(content, userArgs);
    });
  }
};

const main = function() {
  let userArgs = process.argv.slice(2);
  userArgs = getParsedArgs(userArgs);
  userArgs.fields = getFieldsToExtract(userArgs.fields);
  performCutOperation(userArgs, fs.readFileSync);
};

main();

module.exports = {
  messageFormatter,
  getFields,
  getContent,
  getSeparatedFields,
  getParsedArgs,
  performCut
};
