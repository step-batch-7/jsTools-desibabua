const assert = require('chai').assert;
const {cut} = require('../src/cutOperation');

describe('cut', function () {
  const one = 1;
  let usageError = 'usage: cut -b list [-n] [file ...]\n       ';
  usageError +=
    'cut -c list [file ...]\n       cut -f list [-s] [-d delim] [file ...]';

  it('should cut according to userArgs', function () {
    const userArgs = {separator: ' ', fields: [one], fileNames: ['a.text']};

    const reader = function (fileName) {
      assert.equal(fileName, 'a.text');
      return 'hello\ni am here';
    };

    const display = function (output) {
      assert.deepStrictEqual(output, {error: '', lines: 'hello\ni'});
    };
    cut(userArgs, reader, display);
  });

  it('should give error when file is missing', function () {
    const userArgs = {separator: ' ', fileNames: ['a.text']};

    const reader = function () { };

    const display = function (output) {
      assert.deepStrictEqual(output, {error: usageError, lines: ''});
    };
    cut(userArgs, reader, display);
  });

  it('should give error when count is illegal', function () {
    const userArgs = {separator: ' ', fields: ['ab'], fileNames: ['a.text']};

    const reader = function () { };

    const display = function (output) {
      assert.deepStrictEqual(output, {
        error: 'cut: [-cf] list: illegal list value',
        lines: ''
      });
    };
    cut(userArgs, reader, display);
  });

  it('should give error when field is missing', function () {
    const userArgs = {separator: ' ', fields: [one], fileNames: ['a.text']};
    const reader = function () { };

    const display = function (output) {
      assert.deepStrictEqual(output, {
        error: 'cut: a.text: No such file or directory',
        lines: ''
      });
    };
    cut(userArgs, reader, display);
  });
});
