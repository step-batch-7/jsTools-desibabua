const assert = require("chai").assert;
const { messageFormatter, getFields } = require("../cut");

describe("messageFormatter", function() {
  it("should formate the message in right manner if context is there and separator is given", function() {
    const data = {
      context: [
        ["hello", "my"],
        ["this is", "my book"]
      ]
    };
    const separator = ",";
    let actualValue = messageFormatter(data, separator);
    let expectedValue = "hello,my\nthis is,my book";
    assert.strictEqual(actualValue, expectedValue);
  });

  it("should formate the message in right manner if error is there and separator is given", function() {
    const data = { error: "cut: [-cf] list: illegal list value" };
    const separator = ",";
    let actualValue = messageFormatter(data, separator);
    let expectedValue = "cut: [-cf] list: illegal list value";
    assert.strictEqual(actualValue, expectedValue);
  });

  it("should formate the message in right manner if context is there and separator is not given", function() {
    const data = {
      context: [["hello my"], ["this is my book"]]
    };
    let actualValue = messageFormatter(data);
    let expectedValue = "hello my\nthis is my book";
    assert.strictEqual(actualValue, expectedValue);
  });
});

describe("getFields", function() {
  it("should get the desired fields of given context when field is available", function() {
    let data = {
      context: [
        ["hello", "my","name"],
        ["this is", "my book"]
      ]
    };
    let fields = [1];
    let actualValue = getFields(data, fields);
    let expectedValue = { context: [["hello"], ["this is"]] };
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it("should get the desired fields of given context when field is not available", function() {
    let data = {
      context: [
        ["hello", "my","name"],
        ["this is", "my book"]
      ]
    };
    let fields = [3];
    let actualValue = getFields(data, fields);
    let expectedValue = { context: [["name"], []] };
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});
