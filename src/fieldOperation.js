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

module.exports = { getFields, getSeparatedFields };
