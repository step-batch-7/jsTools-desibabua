const assert = require("chai").assert;
const { cut, getContent, performCut } = require("../src/cutLib");

describe("cut", function() {
  
  const usageError = `usage: cut -b list [-n] [file ...]
  cut -c list [file ...]
  cut -f list [-s] [-d delim] [file ...]`;

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

    const display = function(output) {
      assert.deepStrictEqual(output, { content: "hello\ni" });
      return;
    };
    const fsTools = { reader, isExist };
    cut(userArgs, fsTools, display);
  });

  it("should give error when file is missing", function() {
    const userArgs = { separator: " ", fileNames: ["a.text"] };
    const isExist = function(fileName) {
      assert.equal(fileName, "a.text");
      return false;
    };

    const reader = function() {};

    const display = function(output) {
      assert.deepStrictEqual(output, {
        error: usageError
      });
      return;
    };
    const fsTools = { reader, isExist };
    cut(userArgs, fsTools, display);
  });

  it("should give error when field is missing", function() {
    const userArgs = { separator: " ", fields: [1], fileNames: ["a.text"] };
    const isExist = function(fileName) {
      assert.equal(fileName, "a.text");
      return false;
    };

    const reader = function() {};

    const display = function(output) {
      assert.deepStrictEqual(output, {
        error: "cut: a.text: No such file or directory"
      });
      return;
    };
    const fsTools = { reader, isExist };
    cut(userArgs, fsTools, display);
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
});
