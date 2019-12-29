'use strict';
const {
  getContent,
  getSeparatedFields,
  getFields,
  getReducedLines
} = require('./cutLib');
const { getErrorInArgs } = require('./cmdLineArgsHandler');

const performCut = function(fileContent, userArgs) {
  const separatedFields = getSeparatedFields(fileContent, userArgs.separator);
  const content = getFields(separatedFields, userArgs.fields);
  return getReducedLines(content, userArgs.separator);
};

const cut = function(userArgs, reader, doesExist, display) {
  const error = getErrorInArgs(userArgs, doesExist);
  if (error) {
    display({ error });
    return;
  }
  const [fileName] = userArgs.fileNames;
  const content = getContent(fileName, reader);
  display(performCut(content, userArgs, display));
};

module.exports = {
  getContent,
  performCut,
  cut
};
