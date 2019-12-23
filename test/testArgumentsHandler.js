const assert = require("assert");
const { getParsedArgs } = require("../src/argumentsHandler");

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
    let userArgs = ["-d", " ", "-f", "3", "a.text", "b.text"];
    let actualValue = getParsedArgs(userArgs);
    let expectedValue = {
      separator: " ",
      fields: "3",
      fileNames: ["a.text", "b.text"]
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});
