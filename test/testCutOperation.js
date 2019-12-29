const assert = require('chai').assert;
const { cut, performCut } = require('../src/cutOperation');

describe('cut', function() {
  const one = 1;
  let usageError = 'usage: cut -b list [-n] [file ...]\n       ';
  usageError +=
    'cut -c list [file ...]\n       cut -f list [-s] [-d delim] [file ...]';

  it('should cut according to userArgs', function() {
    const userArgs = { separator: ' ', fields: [one], fileNames: ['a.text'] };
    const doesExist = function(fileName) {
      assert.equal(fileName, 'a.text');
      return true;
    };

    const reader = function(fileName) {
      assert.equal(fileName, 'a.text');
      return 'hello\ni am here';
    };

    const display = function(output) {
      assert.deepStrictEqual(output, 'hello\ni');
    };
    cut(userArgs, reader, doesExist, display);
  });

  it('should give error when file is missing', function() {
    const userArgs = { separator: ' ', fileNames: ['a.text'] };
    const doesExist = function(fileName) {
      assert.equal(fileName, 'a.text');
      return false;
    };

    const reader = function() {};

    const display = function(output) {
      assert.deepStrictEqual(output, {
        error: usageError
      });
    };
    cut(userArgs, reader, doesExist, display);
  });

  it('should give error when count is illegal', function() {
    const userArgs = { separator: ' ', fields: ['ab'], fileNames: ['a.text'] };
    const doesExist = function(fileName) {
      assert.equal(fileName, 'a.text');
      return true;
    };

    const reader = function() {};

    const display = function(output) {
      assert.deepStrictEqual(output, {
        error: 'cut: [-cf] list: illegal list value'
      });
    };
    cut(userArgs, reader, doesExist, display);
  });

  it('should give error when field is missing', function() {
    const userArgs = { separator: ' ', fields: [one], fileNames: ['a.text'] };
    const doesExist = function(fileName) {
      assert.equal(fileName, 'a.text');
      return false;
    };

    const reader = function() {};

    const display = function(output) {
      assert.deepStrictEqual(output, {
        error: 'cut: a.text: No such file or directory'
      });
    };
    cut(userArgs, reader, doesExist, display);
  });
});

describe('performCut', function() {
  it('should performCut on given content with userArgs', function() {
    const three = 3;
    const contentOfFile = ['hello where are you', 'I am here.'];
    const userArgs = { separator: ' ', fields: [three] };

    const content = function(data) {
      assert.equal(data, 'are\nhere.');
      return true;
    };
    const print = { content };

    const actualValue = performCut(contentOfFile, userArgs, print);
    assert.isOk(actualValue);
  });
});
