const assert = require('chai').assert;
const sinon = require('sinon');
const {cut, selectReader} = require('../src/cutOperation');

describe('cut', function () {
  const one = 1;
  let usageError = 'usage: cut -b list [-n] [file ...]\n       ';
  usageError +=
    'cut -c list [file ...]\n       cut -f list [-s] [-d delim] [file ...]';

  // it('should cut according to userArgs', function (done) {
  //   const userArgs = {separator: ' ', fields: one, fileNames: 'a.text'};
  //   const reader = sinon.fake();

  //   const display = function (output) {
  //     assert.deepStrictEqual(output, {error: '', lines: 'hello\ni'});
  //     done();
  //   };

  //   cut(userArgs, reader, display);
  //   const [expectedFile, expectedCode] = reader.firstCall.args;
  //   assert.deepStrictEqual([expectedFile, expectedCode], ['a.text', 'utf8']);
  //   reader.firstCall.lastArg(null, 'hello\ni am here');
  // });

  it('it should call display with fileContent is there', function (done) {
    const fields = 1;
    const userArgs = {separator: '\t', fields, fileNames: 'a.text'};
    const readerStream = {setEncoding: sinon.fake(), on: sinon.fake()};

    const display = function (content) {
      assert.deepStrictEqual(content, {lines: 'fileContent\n', error: ''});
      done();
    };

    cut(userArgs, readerStream, display);
    assert.strictEqual(readerStream.on.firstCall.args[0], 'data');
    readerStream.on.firstCall.lastArg('fileContent');
    assert(readerStream.setEncoding.calledWith('utf8'));
  });

  it('it should call display with error when content is null', function (done) {
    const fields = 2;
    const readerStream = {setEncoding: sinon.fake(), on: sinon.fake()};

    const userArgs = {separator: '\t', fields, fileNames: 'bad.text'};
    const errorMessage = 'cut: bad.text: No such file or directory';
    
    const display = function (content) {
      assert.deepStrictEqual(content, {error: errorMessage, lines: ''});
      done();
    };
    
    cut(userArgs, readerStream, display);
    assert(readerStream.setEncoding.calledWith('utf8'));
    assert.strictEqual(readerStream.on.firstCall.args[0], 'data');
    assert.strictEqual(readerStream.on.secondCall.args[0], 'error');
    readerStream.on.secondCall.lastArg({code: 'ENOENT'});
  });

  it('should give error when count is illegal', function (done) {
    const userArgs = {separator: ' ', fields: 'ab', fileNames: 'a.text'};

    const readerStream = {setEncoding: sinon.fake(), on: sinon.fake()};

    const display = function (output) {
      assert.deepStrictEqual(output, {
        error: 'cut: [-cf] list: illegal list value',
        lines: ''
      });
      done();
    };
    assert(readerStream.on.notCalled);
    assert(readerStream.setEncoding.notCalled);
    cut(userArgs, readerStream, display);
  });

  it('should give error when field is missing', function (done) {
    const userArgs = {separator: ' ', fields: undefined, fileNames: 'a.text'};
    const readerStream = {setEncoding: sinon.fake(), on: sinon.fake()};

    const display = function (output) {
      assert.deepStrictEqual(output, {
        error: usageError,
        lines: ''
      });
      done();
    };
    assert(readerStream.on.notCalled);
    assert(readerStream.setEncoding.notCalled);
    cut(userArgs, readerStream, display);
  });

  it('should go to stdin when file is missing', function (done) {
    const userArgs = {separator: ' ', fields: one, fileNames: undefined};
    const readerStream = {setEncoding: sinon.fake(), on: sinon.fake()};

    const display = function (output) {
      assert.deepStrictEqual(output, {
        error: '',
        lines: 'hello\ni\n'
      });
      done();
    };
    cut(userArgs, readerStream, display);
    assert.ok(readerStream.setEncoding.calledWith('utf8'));
    assert.strictEqual(readerStream.on.firstCall.args[0], 'data');
    readerStream.on.firstCall.lastArg('hello\ni am here');
  });
});

describe('selectCut', function () {
  let myStream, createReadStream, stdIn;

  beforeEach(() => {
    myStream = {};
    createReadStream = sinon.fake.returns(myStream);
    stdIn = {};
  });

  it('should give createReadStream when file is given', function () {
    const fileName = 'a.text';
    assert.strictEqual(selectReader(createReadStream, stdIn, fileName), myStream);
    assert.ok(createReadStream.calledWith('a.text'));
  });

  it('should give stdIn when file is not given', function () {
    assert.deepStrictEqual(selectReader(createReadStream, stdIn), {});
  });
});
