const getMessage = function(data, separator) {
  if (data.error) return data;
  let message = data.content.map(line => line.join(separator));
  if (message.slice(-1) == "") message = message.slice(0, -1);
  return { content: message.join("\n") };
};

const displayMessage = function(msgToDisplay, print) {
  msgToDisplay.error && print.error(msgToDisplay.error);
  msgToDisplay.content && print.content(msgToDisplay.content);
};

module.exports = { displayMessage, getMessage };
