const assert = require('chai').assert;
const sinon = require('sinon');
const {cut} = require('../src/cutOperation');
const StreamPicker = require('../src/streamClass');

describe('cut', function () {
  const one = 1;
  let usageError = 'usage: cut -b list [-n] [file ...]\n       ';
  usageError += 'cut -c list [file ...]\n       ';
  usageError += 'cut -f list [-s] [-d delim] [file ...]';

  let fileStream, stdInStream, myStreamPicker;
  beforeEach(() => {
    fileStream = {setEncoding: sinon.fake(), on: sinon.fake()};
    stdInStream = {setEncoding: sinon.fake(), on: sinon.fake()};
    myStreamPicker = new StreamPicker(() => stdInStream, () => fileStream);
  });

  it('it should call display with fileContent is there', function (done) {
    const fields = 1;
    const userArgs = {separator: '\t', fields, fileNames: 'a.text'};

    const display = function (content) {
      assert.deepStrictEqual(content, {lines: 'fileContent\n', error: ''});
      done();
    };

    cut(userArgs, myStreamPicker, display);
    assert(fileStream.setEncoding.calledWith('utf8'));
    assert.strictEqual(fileStream.on.firstCall.args[0], 'data');
    fileStream.on.firstCall.lastArg('fileContent');
  });

  it('it should call display with error when content is null', function (done) {
    const fields = 2;

    const userArgs = {separator: '\t', fields, fileNames: 'bad.text'};
    const errorMessage = 'cut: bad.text: No such file or directory';
    
    const display = function (content) {
      assert.deepStrictEqual(content, {error: errorMessage, lines: ''});
      done();
    };
    
    cut(userArgs, myStreamPicker, display);
    assert(fileStream.setEncoding.calledWith('utf8'));
    assert.strictEqual(fileStream.on.firstCall.args[0], 'data');
    assert.strictEqual(fileStream.on.secondCall.args[0], 'error');
    fileStream.on.secondCall.lastArg({code: 'ENOENT'});
  });

  it('should give error when count is illegal', function (done) {
    const userArgs = {separator: ' ', fields: 'ab', fileNames: 'a.text'};

    const display = function (output) {
      assert.deepStrictEqual(output, {
        error: 'cut: [-cf] list: illegal list value',
        lines: ''
      });
      done();
    };
    assert(fileStream.on.notCalled);
    assert(fileStream.setEncoding.notCalled);
    cut(userArgs, myStreamPicker, display);
  });

  it('should give error when field is missing', function (done) {
    const userArgs = {separator: ' ', fields: undefined, fileNames: 'a.text'};

    const display = function (output) {
      assert.deepStrictEqual(output, {
        error: usageError,
        lines: ''
      });
      done();
    };
    assert(fileStream.on.notCalled);
    assert(fileStream.setEncoding.notCalled);
    cut(userArgs, myStreamPicker, display);
  });

  it('should go to stdin when file is missing', function (done) {
    const userArgs = {separator: ' ', fields: one, fileNames: undefined};

    const display = function (output) {
      assert.deepStrictEqual(output, {
        error: '',
        lines: 'hello\ni\n'
      });
      done();
    };
    cut(userArgs, myStreamPicker, display);
    assert.ok(stdInStream.setEncoding.calledWith('utf8'));
    assert.strictEqual(stdInStream.on.firstCall.args[0], 'data');
    stdInStream.on.firstCall.lastArg('hello\ni am here');
  });
});

