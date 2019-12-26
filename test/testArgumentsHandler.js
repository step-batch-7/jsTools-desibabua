const assert = require("assert");
const {
  getParsedArgs,
  getFieldsToExtract
} = require("../src/cmdLineArgsHandler");

describe("getParsedArgs", function() {
  it("should give parsed args with one file", function() {
    let userArgs = ["-d", " ", "-f", "3", "a.text"];
    let actualValue = getParsedArgs(userArgs);
    let expectedValue = { separator: " ", fields: [3], fileNames: ["a.text"] };
    assert.deepStrictEqual(actualValue, expectedValue);

    userArgs = ["-f", "3", "-d", " ", "ab.text"];
    actualValue = getParsedArgs(userArgs);
    expectedValue = { separator: " ", fields: [3], fileNames: ["ab.text"] };
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should give parsed args when -d is not there", function() {
    let userArgs = ["-f", "3", "a.text"];
    let actualValue = getParsedArgs(userArgs);
    let expectedValue = { separator: "\t", fields: [3], fileNames: ["a.text"] };
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should give error when field is not present", function() {
    let userArgs = ["a.text"];
    let actualValue = getParsedArgs(userArgs);
    const errorMsg = {
      error: `usage: cut -b list [-n] [file ...]
    cut -c list [file ...]
    cut -f list [-s] [-d delim] [file ...]`
    };
    let expectedValue = {
      separator: "\t",
      fields: errorMsg,
      fileNames: ["a.text"]
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});
