const assert = require("chai").assert;
const { displayReducedLines, getReducedLines } = require("../src/messageOperations");

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
