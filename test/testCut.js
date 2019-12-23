const assert = require("chai").assert;
const {
  messageFormatter,
  getFields,
  getContent,
  getSeparatedFields,
  getParsedArgs,
  performCut
} = require("../cut");

describe("messageFormatter", function() {
  it("should formate the message in right manner if content is there and separator is given", function() {
    const data = {
      content: [
        ["hello", "my"],
        ["this is", "my book"]
      ]
    };
    const separator = ",";
    let actualValue = messageFormatter(data, separator);
    let expectedValue = "hello,my\nthis is,my book";
    assert.strictEqual(actualValue, expectedValue);
  });

  it("should formate the message in right manner if error is there and separator is given", function() {
    const data = { error: "cut: [-cf] list: illegal list value" };
    const separator = ",";
    let actualValue = messageFormatter(data, separator);
    let expectedValue = "cut: [-cf] list: illegal list value";
    assert.strictEqual(actualValue, expectedValue);
  });

  it("should formate the message in right manner if content is there and separator is not given", function() {
    const data = {
      content: [["hello my"], ["this is my book"]]
    };
    let actualValue = messageFormatter(data);
    let expectedValue = "hello my\nthis is my book";
    assert.strictEqual(actualValue, expectedValue);
  });
});

describe("getFields", function() {
  it("should get the desired fields of given content when field is available", function() {
    let data = {
      content: [
        ["hello", "my", "name"],
        ["this is", "my book"]
      ]
    };
    let fields = [1];
    let actualValue = getFields(data, fields);
    let expectedValue = { content: [["hello"], ["this is"]] };
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should get the desired fields of given content when field is not available", function() {
    let data = {
      content: [
        ["hello", "my", "name"],
        ["this is", "my book"]
      ]
    };
    let fields = [3];
    let actualValue = getFields(data, fields);
    let expectedValue = { content: [["name"], []] };
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

describe("getContent", function() {
  it("should loadContent from a file", function() {
    const reader = function(path, encoding) {
      assert.strictEqual("a.text", path);
      assert.strictEqual("utf8", encoding);
      return "this is a line of the file\nbut not in file";
    };
    const actualValue = getContent("a.text", reader);
    const expectedValue = {
      content: ["this is a line of the file", "but not in file"]
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should give error when file is not present", function() {
    const reader = function(path, encoding) {
      assert.strictEqual("a.text", path);
      assert.strictEqual("utf8", encoding);
      throw { message: "file is not present" };
    };
    const actualValue = getContent("a.text", reader);
    const expectedValue = { error: ["file is not present"] };
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

describe("getSeparatedLines", function() {
  it("should separate lines by given separator", function() {
    const data = {
      content: ["hello,good morning", "this is my book,but i have one"]
    };
    let separator = " ";
    let actualValue = getSeparatedFields(data, separator);
    let expectedValue = {
      content: [
        ["hello,good", "morning"],
        ["this", "is", "my", "book,but", "i", "have", "one"]
      ]
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should not separate lines when separator is not given", function() {
    const data = {
      content: ["hello,good morning", "this is my book,but i have one"]
    };
    let actualValue = getSeparatedFields(data);
    let expectedValue = {
      content: [["hello,good morning"], ["this is my book,but i have one"]]
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

describe("getParsedArgs", function() {
  it("should give parsed args with one file", function() {
    let userArgs = ["-d", " ", "-f", "3", "a.text"];
    let actualValue = getParsedArgs(userArgs);
    let expectedValue = { separator: " ", fields: "3", fileNames: ["a.text"] };
    assert.deepStrictEqual(actualValue, expectedValue);

    userArgs = ["-f", "3", "-d", " ", "a.text"];
    actualValue = getParsedArgs(userArgs);
    expectedValue = { separator: " ", fields: "3", fileNames: ["a.text"] };
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should give parsed args with two file", function() {
    let userArgs = ["-d", " ", "-f", "3", "a.text","b.text"];
    let actualValue = getParsedArgs(userArgs);
    let expectedValue = { separator: " ", fields: "3", fileNames: ["a.text","b.text"] };
    assert.deepStrictEqual(actualValue, expectedValue);
  })
});

describe('performCut',function() {
  it('should performCut on given content with userArgs', function() {
    const contentOfFile = {content:['hello where are you','I am here.']}
    const userArgs = {separator:" ",fields : [3]}
    let actualValue = performCut(contentOfFile,userArgs)
    let expectedValue = 'are\nhere.'
    assert.strictEqual(actualValue, expectedValue);
  });

  it('should not performCut on given error with userArgs', function() {
    const contentOfFile = {error:"this is an error"}
    const userArgs = {separator:" ",fields : [3]}
    let actualValue = performCut(contentOfFile,userArgs)
    let expectedValue = 'this is an error'
    assert.strictEqual(actualValue, expectedValue);
  });
});
