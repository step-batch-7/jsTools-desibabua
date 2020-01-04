const assert = require('chai').assert;

const {
  performCut, getFields,
  getSeparatedFields, getReducedLines
} = require('../src/cutLib');

describe('getFields', function () {
  const one = 1;
  const three = 3;
  it('should get the desired fields when field is available', function () {
    const data = [
      ['hello', 'my', 'name'],
      ['this is', 'my book']
    ];
    const fields = one;
    const actualValue = getFields(data, fields);
    const expectedValue = [['hello'], ['this is']];
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it('should get the desired fields when field is not available', function () {
    const data = [
      ['hello', 'my', 'name'],
      ['this is', 'my book']
    ];
    const fields = three;
    const actualValue = getFields(data, fields);
    const expectedValue = [['name'], [undefined]];
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it('should get fields if content element has length one', function () {
    const data = [['hello my name'], ['this is', 'my book']];
    const fields = three;
    const actualValue = getFields(data, fields);
    const expectedValue = [['hello my name'], [undefined]];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

describe('getSeparatedLines', function () {
  it('should separate lines by given separator', function () {
    const data = ['hello,good morning', 'this is my book,but i have one'];
    const separator = ' ';
    const actualValue = getSeparatedFields(data, separator);
    const expectedValue = [
      ['hello,good', 'morning'],
      ['this', 'is', 'my', 'book,but', 'i', 'have', 'one']
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it('should not separate lines when separator is not given', function () {
    const data = ['hello,good morning', 'this is my book,but i have one'];
    const actualValue = getSeparatedFields(data);
    const expectedValue = [
      ['hello,good morning'],
      ['this is my book,but i have one']
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

describe('getReducedLines', function () {
  it('should give lines if content and separator is given', function () {
    const content = [
      ['hello', 'my'],
      ['this is', 'my book']
    ];

    const separator = ',';
    const actualValue = getReducedLines(content, separator);
    assert.deepStrictEqual(actualValue, 'hello,my\nthis is,my book');
  });

  it('should give lines if content is given and separator is not', function () {
    const content = [['hello my'], ['this is my book']];
    const actualValue = getReducedLines(content);
    assert.deepStrictEqual(actualValue, 'hello my\nthis is my book');
  });
});

describe('performCut', function () {
  it('should performCut on given content with userArgs', function () {
    const fields = 3;
    const contentOfFile = 'hello where are you\nI am here.';
    const actualValue = performCut(contentOfFile, ' ', fields);
    const expectedValue = 'are\nhere.';
    assert.strictEqual(actualValue, expectedValue);
  });

  it('should perform cut when last line is empty', function () {
    const content = 'hello\nmy this is my book\n';
    const fields = 1;
    const actualValue = performCut(content, ' ', fields);
    assert.strictEqual(actualValue, 'hello\nmy');
  });

});
