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

const getRange = function(field){
  field = field.split('-')
  const firstNumber = Number(field[0])
  const lastNumber = Number(field[field.length-1])
  const range = []
  for(let i= firstNumber ;i<= lastNumber;i++){
    range.push(i)
  }
  return range
}

const getFieldsToExtract = function(numberInString, separator) {
  if (!separator) return [1];
  fields = numberInString.split(',')
  return fields.flatMap(field=>getRange(field))
};

module.exports = { getParsedArgs, getFieldsToExtract };
