const assert = require("chai").assert;
const { displayReducedLines, getReducedLines } = require("../src/messageOperations");

describe("displayReducedLines", function() {
  it("should display message when content is there", function() {
    const content = function(data) {
      assert.equal(data, "hello");
    };

    const print = { content };

    let msgToDisplay = { content: "hello" };
    displayReducedLines(msgToDisplay, print);
  });

  it("should display message when error is there", function() {
    const error = function(data) {
      assert.equal(data, "wrongMessage");
    };

    const print = { error };

    let msgToDisplay = { error: "wrongMessage" };
    displayReducedLines(msgToDisplay, print);
  });
});

describe("getReducedLines", function() {
  it("should give message when last line is empty", function() {
    let data = {
      content: [["hello", "my"], ["this is", "my book"], [""]]
    };
    let actualValue = getReducedLines(data, ",");
    assert.deepStrictEqual(actualValue, {
      content: "hello,my\nthis is,my book"
    });
  });

  it("should formate the message in right manner if content is there and separator is given", function() {
    const data = {
      content: [
        ["hello", "my"],
        ["this is", "my book"]
      ]
    };

    const separator = ",";
    let actualValue = getReducedLines(data, separator);
    assert.deepStrictEqual(actualValue, {
      content: "hello,my\nthis is,my book"
    });
  });

  it("should formate the message in right manner if error is there and separator is given", function() {
    const data = { error: "cut: [-cf] list: illegal list value" };
    const separator = ",";
    let actualValue = getReducedLines(data, separator);
    assert.deepStrictEqual(actualValue, {
      error: "cut: [-cf] list: illegal list value"
    });
  });

  it("should formate the message in right manner if content is there and separator is not given", function() {
    const data = {
      content: [["hello my"], ["this is my book"]]
    };
    let actualValue = getReducedLines(data);
    assert.deepStrictEqual(actualValue, {
      content: "hello my\nthis is my book"
    });
  });
});
