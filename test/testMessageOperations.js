const assert = require("chai").assert;
const {
  displayReducedLines,
  getReducedLines
} = require("../src/messageOperations");

describe("getReducedLines", function() {
  it("should give message when last line is empty", function() {
    const content = [["hello", "my"], ["this is", "my book"], [""]];

    let actualValue = getReducedLines(content, ",");
    assert.deepStrictEqual(actualValue, {
      content: "hello,my\nthis is,my book"
    });
  });

  it("should formate the message in right manner if content is there and separator is given", function() {
    const content = [
      ["hello", "my"],
      ["this is", "my book"]
    ];

    const separator = ",";
    let actualValue = getReducedLines(content, separator);
    assert.deepStrictEqual(actualValue, {
      content: "hello,my\nthis is,my book"
    });
  });

  it("should formate the message in right manner if content is there and separator is not given", function() {
    const content = [["hello my"], ["this is my book"]];
    let actualValue = getReducedLines(content);
    assert.deepStrictEqual(actualValue, {
      content: "hello my\nthis is my book"
    });
  });
});
