const assert = require('assert');
const {getParsedArgs} = require('../src/cmdLineArgsHandler');

describe('getParsedArgs', function () {
  const three = 3;
  it('should give parsed args with one file', function () {
    const userArgs = ['-d', ' ', '-f', '3', 'a.text'];
    const actualValue = getParsedArgs(userArgs);
    const expectedValue = {
      separator: ' ',
      fields: three,
      fileNames: 'a.text'
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it('should give parsed args when -d is not there', function () {
    const userArgs = ['-f', '3', 'a.text'];
    const actualValue = getParsedArgs(userArgs);
    const expectedValue = {
      separator: '\t',
      fields: three,
      fileNames: 'a.text'
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it('should give error when field is not present', function () {
    const userArgs = ['a.text'];
    const actualValue = getParsedArgs(userArgs);
    const expectedValue = {
      separator: '\t',
      fields: undefined,
      fileNames: undefined
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});
