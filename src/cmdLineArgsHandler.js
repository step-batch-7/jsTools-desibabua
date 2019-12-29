'use strict';

const isPresent = function (option) {
  return this.includes(option);
};

const optionValue = function (option, num = 1) {
  return this[this.indexOf(option) + num];
};

const getParsedArgs = function (userArgs) {
  const isOptionPresent = isPresent.bind(userArgs);
  const getOptionValue = optionValue.bind(userArgs);

  const separator = isOptionPresent('-d') ? getOptionValue('-d') : '\t';
  const fields = isOptionPresent('-f') ? [+getOptionValue('-f')] : undefined;
  const fileNames = [getOptionValue('-f', 2)];
  return { separator, fields, fileNames };
};

const getErrorType = function () {
  let usage =
    'usage: cut -b list [-n] [file ...]\n       cut -c list [file ...]\n';
  usage = usage + '       cut -f list [-s] [-d delim] [file ...]';
  const illegalCount = 'cut: [-cf] list: illegal list value';
  return { usage, illegalCount};
};

const getErrorInArgs = function (userArgs) {
  const errors = getErrorType();
  if (!userArgs.fields) {
    return errors.usage;
  }
  if (!Number(userArgs.fields)) {
    return errors.illegalCount;
  }
  return false;
};

module.exports = { getParsedArgs, getErrorInArgs };
