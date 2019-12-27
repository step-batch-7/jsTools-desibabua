const getReducedLines = function(content, separator) {
  let lines = content.map(line => line.join(separator));
  if (isLastLineEmpty(lines)) lines = lines.slice(0, -1);
  return lines.join("\n");
};

const isLastLineEmpty = function(message) {
  return message.slice(-1) == "";
};

module.exports = { getReducedLines };
