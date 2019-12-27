const assert = require("chai").assert;
const { getFields, getSeparatedFields } = require("../src/fieldOperation");

describe("getFields", function() {
  it("should get the desired fields of given content when field is available", function() {
    let data = [
      ["hello", "my", "name"],
      ["this is", "my book"]
    ];
    let fields = [1];
    let actualValue = getFields(data, fields);
    let expectedValue = [["hello"], ["this is"]];
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should get the desired fields of given content when field is not available", function() {
    let data = [
      ["hello", "my", "name"],
      ["this is", "my book"]
    ];
    let fields = [3];
    let actualValue = getFields(data, fields);
    let expectedValue = [["name"], [undefined]];
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should get the desired fields of given content when field has only one length available", function() {
    let data = [["hello my name"], ["this is", "my book"]];
    let fields = [3];
    let actualValue = getFields(data, fields);
    let expectedValue = [["hello my name"], [undefined]];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

describe("getSeparatedLines", function() {
  it("should separate lines by given separator", function() {
    const data = ["hello,good morning", "this is my book,but i have one"];
    let separator = " ";
    let actualValue = getSeparatedFields(data, separator);
    let expectedValue = [
      ["hello,good", "morning"],
      ["this", "is", "my", "book,but", "i", "have", "one"]
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should not separate lines when separator is not given", function() {
    const data = ["hello,good morning", "this is my book,but i have one"];
    let actualValue = getSeparatedFields(data);
    let expectedValue = [
      ["hello,good morning"],
      ["this is my book,but i have one"]
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});
