const assert = require('chai').assert;
const {
  getContent,
  getFields,
  getSeparatedFields,
  getReducedLines
} = require('../src/cutLib');

describe('getFields', function() {
  const one = 1;
  const three = 3;
  it('should get the desired fields when field is available', function() {
    const data = [
      ['hello', 'my', 'name'],
      ['this is', 'my book']
    ];
    const fields = [one];
    const actualValue = getFields(data, fields);
    const expectedValue = [['hello'], ['this is']];
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it('should get the desired fields when field is not available', function() {
    const data = [
      ['hello', 'my', 'name'],
      ['this is', 'my book']
    ];
    const fields = [three];
    const actualValue = getFields(data, fields);
    const expectedValue = [['name'], [undefined]];
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it('should get fields if content element has length one', function() {
    const data = [['hello my name'], ['this is', 'my book']];
    const fields = [three];
    const actualValue = getFields(data, fields);
    const expectedValue = [['hello my name'], [undefined]];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

describe('getSeparatedLines', function() {
  it('should separate lines by given separator', function() {
    const data = ['hello,good morning', 'this is my book,but i have one'];
    const separator = ' ';
    const actualValue = getSeparatedFields(data, separator);
    const expectedValue = [
      ['hello,good', 'morning'],
      ['this', 'is', 'my', 'book,but', 'i', 'have', 'one']
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it('should not separate lines when separator is not given', function() {
    const data = ['hello,good morning', 'this is my book,but i have one'];
    const actualValue = getSeparatedFields(data);
    const expectedValue = [
      ['hello,good morning'],
      ['this is my book,but i have one']
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

describe('getReducedLines', function() {
  it('should give message when last line is empty', function() {
    const content = [['hello', 'my'], ['this is', 'my book'], ['']];

    const actualValue = getReducedLines(content, ',');
    assert.deepStrictEqual(actualValue, 'hello,my\nthis is,my book');
  });

  it('should give lines if content and separator is given', function() {
    const content = [
      ['hello', 'my'],
      ['this is', 'my book']
    ];

    const separator = ',';
    const actualValue = getReducedLines(content, separator);
    assert.deepStrictEqual(actualValue, 'hello,my\nthis is,my book');
  });

  it('should give lines if content is given and separator is not', function() {
    const content = [['hello my'], ['this is my book']];
    const actualValue = getReducedLines(content);
    assert.deepStrictEqual(actualValue, 'hello my\nthis is my book');
  });
});

describe('getContent', function() {
  it('should loadContent from a file', function() {
    const reader = function(path, encoding) {
      assert.strictEqual('a.text', path);
      assert.strictEqual('utf8', encoding);
      return 'this is a line of the file\nbut not in file';
    };

    const actualValue = getContent('a.text', reader);
    const expectedValue = ['this is a line of the file', 'but not in file'];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});
