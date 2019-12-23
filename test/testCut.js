const assert = require("chai").assert;
const {
  messageFormatter,
  getFields,
  getContent,
  getSeparatedFields,
  performCut,
  getMessage
} = require("../src/cutLib");

describe("messageFormatter", function() {
  it("should formate the message in right manner if content is there and separator is given", function() {
    const data = {
      content: [
        ["hello", "my"],
        ["this is", "my book"]
      ]
    };

    const content = function(data) {
      assert.equal(data, "hello,my\nthis is,my book");
      return true;
    };
    const print = { content };

    const separator = ",";
    let actualValue = messageFormatter(data, print, separator);
    assert.isOk(actualValue);
  });

  it("should formate the message in right manner if error is there and separator is given", function() {
    const data = { error: "cut: [-cf] list: illegal list value" };

    const error = function(data) {
      assert.equal(data, "cut: [-cf] list: illegal list value");
      return true;
    };
    const print = { error };

    const separator = ",";
    let actualValue = messageFormatter(data, print, separator);
    assert.isOk(actualValue);
  });

  it("should formate the message in right manner if content is there and separator is not given", function() {
    const data = {
      content: [["hello my"], ["this is my book"]]
    };
    const content = function(data) {
      assert.equal(data, "hello my\nthis is my book");
      return true;
    };
    const print = { content };

    let actualValue = messageFormatter(data, print);
    assert.isOk(actualValue);
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
      throw { message: `cut: ${path}: No such file or directory` };
    };
    const actualValue = getContent("a.text", reader);
    const expectedValue = {
      error: `cut: ${"a.text"}: No such file or directory`
    };
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

describe("performCut", function() {
  it("should performCut on given content with userArgs", function() {
    const contentOfFile = { content: ["hello where are you", "I am here."] };
    const userArgs = { separator: " ", fields: [3] };

    const content = function(data) {
      assert.equal(data, "are\nhere.");
      return true;
    };
    const print = { content };

    let actualValue = performCut(contentOfFile, userArgs, print);
    assert.isOk(actualValue);
  });

  it("should not performCut on given error with userArgs", function() {
    const contentOfFile = { error: "this is an error" };
    const userArgs = { separator: " ", fields: [3] };

    const error = function(data) {
      assert.equal(data, "this is an error");
      return true;
    };
    const print = { error };

    let actualValue = performCut(contentOfFile, userArgs, print);
    assert.isOk(actualValue);
  });
});

describe("getMessage", function() {
  it("should give message", function() {
    let data = {
      content: [["hello", "my"], ["this is", "my book"], [""]]
    };
    let actualValue = getMessage(data, ",");
    assert.strictEqual(actualValue, "hello,my\nthis is,my book");
  });
});
