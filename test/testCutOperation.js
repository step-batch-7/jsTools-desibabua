const assert = require('chai').assert;
const sinon = require('sinon');
const {cut, selectReader} = require('../src/cutOperation');

describe('cut', function () {
  const one = 1;
  let usageError = 'usage: cut -b list [-n] [file ...]\n       ';
  usageError +=
    'cut -c list [file ...]\n       cut -f list [-s] [-d delim] [file ...]';

  it('should cut according to userArgs', function (done) {
    const userArgs = {separator: ' ', fields: one, fileNames: 'a.text'};
    const reader = sinon.fake();

    const display = function (output) {
      assert.deepStrictEqual(output, {error: '', lines: 'hello\ni'});
      done();
    };

    cut(userArgs, reader, display);
    const [expectedFile, expectedCode] = reader.firstCall.args;
    assert.deepStrictEqual([expectedFile, expectedCode], ['a.text', 'utf8']);
    reader.firstCall.lastArg(null, 'hello\ni am here');
  });

  it('should give error when count is illegal', function (done) {
    const userArgs = {separator: ' ', fields: 'ab', fileNames: 'a.text'};

    const reader = sinon.fake();

    const display = function (output) {
      assert.deepStrictEqual(output, {
        error: 'cut: [-cf] list: illegal list value',
        lines: ''
      });
      done();
    };
    assert(reader.notCalled);
    cut(userArgs, reader, display);
  });

  it('should give error when field is missing', function (done) {
    const userArgs = {separator: ' ', fields: undefined, fileNames: 'a.text'};
    const reader = sinon.fake();

    const display = function (output) {
      assert.deepStrictEqual(output, {
        error: usageError,
        lines: ''
      });
      done();
    };
    assert(reader.notCalled);
    cut(userArgs, reader, display);
  });

  it('should go to stdin when file is missing', function (done) {
    const userArgs = {separator: ' ', fields: one, fileNames: undefined};
    const reader = {setEncoding: sinon.fake(), on: sinon.fake()};

    const display = function (output) {
      assert.deepStrictEqual(output, {
        error: '',
        lines: 'hello\ni\n'
      });
      done();
    };
    cut(userArgs, reader, display);
    assert.ok(reader.setEncoding.calledWith('utf8'));
    assert.strictEqual(reader.on.firstCall.args[0], 'data');
    reader.on.firstCall.args[1]('hello\ni am here');
  });
});

describe('selectCut', function () {
  it('should give fsReader when file is given', function () {
    const userArgs = {fileNames: 'a.text'};
    const actualValue = selectReader('fsReader', 'stdIn', userArgs);
    assert.strictEqual(actualValue, 'fsReader');
  });

  it('should give stdIn when file is not given', function () {
    const actualValue = selectReader('fsReader', 'stdIn', undefined);
    assert.strictEqual(actualValue, 'stdIn');
  });
});
