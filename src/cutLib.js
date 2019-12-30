const getFields = function (lists, fields) {

  const returnMessage = lists.map(line => {
    const [firstElement] = line;
    if (line.length === 1) {
      return [firstElement];
    }
    return [line[fields - 1]];
  });
  return returnMessage;
};

const getSeparatedFields = function (lists, separator) {
  return lists.map(line => line.split(separator));
};

const getReducedLines = function (content, separator) {
  let lines = content.map(line => line.join(separator));
  if (isLastLineEmpty(lines)) {
    lines = lines.slice(0, -1);
  }
  return lines.join('\n');
};

const isLastLineEmpty = function (message) {
  return message.slice(-1)[0] === '';
};

const performCut = function (fileContent, userArgs) {
  const separatedFields = getSeparatedFields(fileContent, userArgs.separator);
  const content = getFields(separatedFields, userArgs.fields);
  return getReducedLines(content, userArgs.separator);
};

const showCutLines = function (usrArgs, reader, display) {
  const [fileName] = usrArgs.fileNames;

  const getFileError = {
    ENOENT: `cut: ${fileName}: No such file or directory`,
    EACCES: `cut: ${fileName}: Permission denied`,
  };

  reader(fileName, 'utf8', (err, data) => {
    if (err) {
      display({ error: getFileError[err.code] });
      return;
    }
    const content = data.split('\n');
    display(performCut(content, usrArgs));
  });
};

module.exports = {
  showCutLines, getFields,
  getSeparatedFields, getReducedLines, performCut
};
