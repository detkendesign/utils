import { expect, it, suite } from "vitest";
import {
  hashStringToNumber,
  isString,
  pluralize,
  safeParseJSON,
} from "~/lib/strings/utils";

suite("strings", () => {
  it("initializes suite correctly", () => {
    expect("foo").toHaveLength(3);
  });

  suite("isString", () => {
    it("returns true if the value is a string", () => {
      expect(isString("foo")).toBe(true);
    });
    it("returns false if the value is not a string", () => {
      expect(isString(1)).toBe(false);
    });
  });

  suite("pluralize", () => {
    it("pluralizes a word with a default pattern", () => {
      expect(pluralize(2, "apple")).toEqual("apples");
    });
    it("singularizes a word with length 0", () => {
      expect(pluralize(0, "apple")).toEqual("apples");
    });

    it("pluralizes a word with a custom pattern", () => {
      expect(pluralize(2, "apple", "applesauce")).toEqual("applesauce");
    });
  });

  suite("safeParseJSON", () => {
    it("parses a valid JSON string", () => {
      expect(safeParseJSON('{"foo":"bar"}')).toEqual({ foo: "bar" });
    });
    it("returns undefined for an invalid JSON string", () => {
      expect(safeParseJSON("invalid")).toEqual(undefined);
    });
    it("returns undefined for an empty string", () => {
      expect(safeParseJSON("")).toEqual(undefined);
    });
    it("parses a valid JSON string with type template", () => {
      const result = safeParseJSON<{ foo: string }>('{"foo":"bar"}');
      expect(result).toEqual({ foo: "bar" });
    });
  });
});

suite("hashStringToNumber", () => {
  it("hashes a string to a number", () => {
    expect(hashStringToNumber("foo")).toEqual(101574);
  });
  it("hashes a string to a number with a range", () => {
    expect(hashStringToNumber("foo", 100)).toEqual(74);
  });
});
