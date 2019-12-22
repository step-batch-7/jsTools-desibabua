const messageFormatter = function(data, separator) {
  if (data.error) return data.error;
  return data.context.map(line => line.join(separator)).join("\n");
};

const getFields = function(data, fields) {
  let returnMessage = data.context.map(list =>
    list.filter((word, index) => fields.includes(index + 1))
  );
  return { context: returnMessage };
};

const main = function() {};

main();

module.exports = { messageFormatter, getFields };
