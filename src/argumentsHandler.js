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

const getFieldsToExtract = function(numberInString, separator) {
  if (!separator) return [1];
  return [Number(numberInString)];
};

module.exports = { getParsedArgs, getFieldsToExtract };
