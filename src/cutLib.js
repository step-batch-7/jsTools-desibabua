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
  const lastIndex = -1;
  if (lines.endsWith('\n')) {
    return lines.slice(firstIndex, lastIndex).split('\n');
  }
  return lines.split('\n');
};

const performCut = function (fileContent, separator, fields) {
  const lines = removeLastEmptyLine(fileContent);
  const separatedFields = getSeparatedFields(lines, separator);
  const content = getFields(separatedFields, fields);
  return getReducedLines(content, separator);
};

const showCutLines = function (usrArgs, reader, display) {
  const fileName = usrArgs.fileNames;
  const [separator, fields] = [usrArgs.separator, usrArgs.fields];
  const getFileError = {
    ENOENT: `cut: ${fileName}: No such file or directory`,
    EACCES: `cut: ${fileName}: Permission denied`,
  };

  reader(fileName, 'utf8', (err, lines) => {
    if (err) {
      display({error: getFileError[err.code], lines: ''});
      return;
    }
    display({lines: performCut(lines, separator, fields), error: ''});
  });
};

const showCutLinesOnStdin = function (usrArgs, stdin, display) {
  stdin.setEncoding('utf8');
  const [separator, fields] = [usrArgs.separator, usrArgs.fields];
  stdin.on('data', (chunk) => {
    display({
      lines: `${performCut(chunk, separator, fields)}\n`, error: ''
    });
  });
};

module.exports = {
  showCutLines, showCutLinesOnStdin, getFields,
  getSeparatedFields, getReducedLines, performCut
};
