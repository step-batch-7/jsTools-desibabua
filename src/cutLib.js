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

module.exports = {
  messageFormatter,
  getFields,
  getContent,
  getSeparatedFields,
  performCut,
  performCutOperation,
  getFieldsToExtract
};
