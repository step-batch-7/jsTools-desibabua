const getMessage = function(data, separator) {
  let message = data.content.map(line => line.join(separator));
  if (message[message.length - 1] == "") {
    message.splice(message.length - 1);
  }
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

const getContent = function(fileName, reader) {
  try {
    let content = reader(fileName, "utf8");
    content = content.split("\n");
    return { content };
  } catch (err) {
    return { error: `cut: ${fileName}: No such file or directory` };
  }
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

const performCutOperation = function(userArgs, reader, print) {
  if (userArgs.fileNames.length !== 0) {
    userArgs.fileNames.forEach(fileName => {
      let content = getContent(fileName, reader);
      performCut(content, userArgs, print);
    });
  } else {
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", line => {
      data = { content: line.split('\n') };
      performCut(data, userArgs, print);
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
  getMessage
};
