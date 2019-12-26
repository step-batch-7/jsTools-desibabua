const assert = require("chai").assert;
const {
  messageFormatter,
  getContent,
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

describe("getContent", function() {
  it("should loadContent from a file", function() {
    const reader = function(path, encoding) {
      assert.strictEqual("a.text", path);
      assert.strictEqual("utf8", encoding);
      return "this is a line of the file\nbut not in file";
    };

    const isExist = function(fileName) {
      assert.strictEqual(fileName, "a.text");
      return true;
    };

    const fsTools = { reader, isExist };
    const actualValue = getContent("a.text", fsTools);
    const expectedValue = {
      content: ["this is a line of the file", "but not in file"]
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should give error when file is not present", function() {
    const reader = function(path, encoding) {
      assert.strictEqual("a.text", path);
      assert.strictEqual("utf8", encoding);
    };

    const isExist = function(fileName) {
      assert.strictEqual(fileName, "bad.text");
      return false;
    };

    const fsTools = { reader, isExist };

    const actualValue = getContent("bad.text", fsTools);
    const expectedValue = {
      error: `cut: ${"bad.text"}: No such file or directory`
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
