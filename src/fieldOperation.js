const getFields = function(data, fields) {
  let returnMessage = data.content.map(line => {
    if (line.length == 1) return [line[0]];
    return [line[fields - 1]];
  });
  return { content: returnMessage };
};

const getSeparatedFields = function(data, separator) {
  return { content: data.content.map(line => line.split(separator)) };
};

module.exports = { getFields, getSeparatedFields };