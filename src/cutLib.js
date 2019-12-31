const getFields = function (lists, fields) {
  const unit = 1;
  const minLength = 1;
  const returnMessage = lists.map(line => {
    if (line.length === minLength) {
      return line;
    }
    return [line[fields - unit]];
  });
  return returnMessage;
};

const getSeparatedFields = function (lists, separator) {
  return lists.map(line => line.split(separator));
};

const getReducedLines = function (content, separator) {
  const lines = content.map(line => line.join(separator));
  return lines.join('\n');
};

const removeLastEmptyLine = function (lines) {
  const firstIndex = 0;
  const lastIndex = -2;
  if (lines.endsWith('\n ')) {
    return lines.slice(firstIndex, lastIndex).split('\n');
  }
  return lines.split('\n');
};

const performCut = function (fileContent, userArgs) {
  const lines = removeLastEmptyLine(fileContent);
  const separatedFields = getSeparatedFields(lines, userArgs.separator);
  const content = getFields(separatedFields, userArgs.fields);
  return getReducedLines(content, userArgs.separator);
};

const showCutLines = function (usrArgs, reader, display) {
  const fileName = usrArgs.fileNames;

  const getFileError = {
    ENOENT: `cut: ${fileName}: No such file or directory`,
    EACCES: `cut: ${fileName}: Permission denied`,
  };

  reader(fileName, 'utf8', (err, data) => {
    if (err) {
      display({ error: getFileError[err.code] });
      return;
    }
    display(performCut(data, usrArgs));
  });
};

module.exports = {
  showCutLines, getFields,
  getSeparatedFields, getReducedLines, performCut
};
