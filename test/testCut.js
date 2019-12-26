const assert = require("chai").assert;
const { cut, getContent, performCut } = require("../src/cutLib");

describe("cut", function() {
  it("should cut according to userArgs", function() {
    const userArgs = { separator: " ", fields: [1], fileNames: ["a.text"] };
    const isExist = function(fileName) {
      assert.equal(fileName, "a.text");
      return true;
    };

    const reader = function(fileName) {
      assert.equal(fileName, "a.text");
      return "hello\ni am here";
    };

    const fsTools = { reader, isExist };
    let actualValue = cut(userArgs, fsTools);
    let expectedValue = { content: "hello\ni" };
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should not cut anything and give error when field is not present", function() {
    const errorMsg = {
      error: `usage: cut -b list [-n] [file ...]
    cut -c list [file ...]
    cut -f list [-s] [-d delim] [file ...]`
    };
    let userArgs = { separator: "\t", fields: errorMsg };
    let actualValue = cut(userArgs)
    let expectedValue = errorMsg;
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
