'use strict';

const getParsedArgs = function (userArgs) {

  const isOptionPresent = (key) => userArgs.includes(key);

  const getOptionValue = (key, num) => {
    const index = userArgs.indexOf(key) + num;
    return userArgs[index];
  };

  const one = 1;
  const two = 2;
  const separator = isOptionPresent('-d') ? getOptionValue('-d', one) : '\t';
  const fields = isOptionPresent('-f') ? +getOptionValue('-f', one) : undefined;
  const fileNames = getOptionValue('-f', two);
  return {separator, fields, fileNames};
};

const getErrorType = function () {
  let usage =
    'usage: cut -b list [-n] [file ...]\n       cut -c list [file ...]\n';
  usage = usage + '       cut -f list [-s] [-d delim] [file ...]';
  const illegalCount = 'cut: [-cf] list: illegal list value';
  return {usage, illegalCount};
};

const getErrorInArgs = function (userArgs) {
  const errors = getErrorType();
  if (userArgs.fields === undefined) {
    return errors.usage;
  }
  if (!Number(userArgs.fields)) {
    return errors.illegalCount;
  }
  return false;
};

module.exports = {getParsedArgs, getErrorInArgs};
