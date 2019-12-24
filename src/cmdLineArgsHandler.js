"use strict";

const getParsedArgs = function(userArgs) {
  if (userArgs.length >= 2) {
    const separator = "\t";
    const fields = [+userArgs[1]];
    const fileNames = userArgs.slice(2);
    return { separator, fields, fileNames };
  }
  return {
    error: `usage: cut -b list [-n] [file ...]\ncut -c list [file ...]\ncut -f list [-s] [-d delim] [file ...]`
  };
};

module.exports = { getParsedArgs };
