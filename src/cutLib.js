const getFields = function(lists, fields) {
  let returnMessage = lists.map(line => {
    if (line.length == 1) return [line[0]];
    return [line[fields - 1]];
  });
  return returnMessage;
};

const getSeparatedFields = function(lists, separator) {
  return lists.map(line => line.split(separator));
};

const getReducedLines = function(content, separator) {
  let lines = content.map(line => line.join(separator));
  if (isLastLineEmpty(lines)) lines = lines.slice(0, -1);
  return lines.join("\n");
};

const isLastLineEmpty = function(message) {
  return message.slice(-1) == "";
};

module.exports = { getFields, getSeparatedFields, getReducedLines };
