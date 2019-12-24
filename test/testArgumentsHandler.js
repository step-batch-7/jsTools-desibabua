const assert = require("assert");
const {
  getParsedArgs,
  getFieldsToExtract
} = require("../src/argumentsHandler");

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

  it("should give parsed args when -d is not there", function() {
    let userArgs = ["-f", "3", "a.text"];
    let actualValue = getParsedArgs(userArgs);
    let expectedValue = { separator: "\t", fields: "3", fileNames: ["a.text"] };
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

describe("getFieldsToExtract", function() {
  it("should give fields which have to extract when delimiter is not given", function() {
    let actualValue = getFieldsToExtract("5","\t");
    let expectedValue = [1];
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should give fields which have to extract when delimiter is given", function() {
    let actualValue = getFieldsToExtract("5", ",");
    let expectedValue = [5];
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it('should give fields when "," is between fields', function() {
    let actualValue = getFieldsToExtract("5,6,7,1", ",");
    let expectedValue = [5, 6, 7, 1];
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it('should give fields when "-" is between fields', function() {
    let actualValue = getFieldsToExtract("5-9", ",");
    let expectedValue = [5, 6, 7, 8, 9];
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it('should give fields when "-" and "," is between fields', function() {
    let actualValue = getFieldsToExtract("1,5-9,10", ",");
    let expectedValue = [1, 5, 6, 7, 8, 9, 10];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});
