const assert = require('assert');
const sinon = require('sinon');
const StreamPicker = require('../src/streamClass');

describe('streamReader', function () {
  let myStream, createReadStream, stdIn;

  beforeEach(() => {
    myStream = {};
    createReadStream = sinon.fake.returns(myStream);
    stdIn = () => {
      return {};
    };
  });

  it('should give fileStream when file is given', function () {
    const fileName = 'a.text';
    const myReaderStream = new StreamPicker(stdIn, createReadStream);
    assert.strictEqual(myReaderStream.pick(fileName), myStream);
    assert.ok(createReadStream.calledWith('a.text'));
  });

  it('should give stdIn when file is not given', function () {
    const myReaderStream = new StreamPicker(stdIn, createReadStream);
    assert.deepStrictEqual(myReaderStream.pick(undefined), {});
  });
});
