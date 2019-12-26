"use strict";

const fs = require("fs");
const { getParsedArgs } = require("./src/cmdLineArgsHandler");
const { cut } = require("./src/cutLib");
const { displayMessage } = require("./src/messageOperations");

const main = function() {
  const print = { content: console.log, error: console.error };
  const fsTools = { reader: fs.readFileSync, isExist: fs.existsSync };

  const userArgs = getParsedArgs(process.argv.slice(2));
  const msgToDisplay = cut(userArgs, fsTools);
  displayMessage(msgToDisplay, print);
};

main();
