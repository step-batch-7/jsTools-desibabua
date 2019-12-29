const getFields = function(lists, fields) {
  const returnMessage = lists.map(line => {
    if (line.length === 1) {
      return [line[0]];
    }
    return [line[fields - 1]];
  });
  return returnMessage;
};

const getSeparatedFields = function(lists, separator) {
  return lists.map(line => line.split(separator));
};

const getReducedLines = function(content, separator) {
  let lines = content.map(line => line.join(separator));
  if (isLastLineEmpty(lines)) {
    lines = lines.slice(0, -1);
  }
  return lines.join('\n');
};

const isLastLineEmpty = function(message) {
  return message.slice(-1)[0] === '';
};

const getContent = function(fileName, reader) {
  const content = reader(fileName, 'utf8');
  return content.split('\n');
};

module.exports = { getContent, getFields, getSeparatedFields, getReducedLines };
