const getReducedLines = function(data, separator) {
  if (data.error) return data;
  let message = data.content.map(line => line.join(separator));
  if (isLastLineEmpty(message)) message = message.slice(0, -1);
  return { content: message.join("\n") };
};

const isLastLineEmpty = function(message) {
  return message.slice(-1) == "";
};

module.exports = { getReducedLines };
