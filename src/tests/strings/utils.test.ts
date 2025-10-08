import { expect, it, suite } from "vitest";
import { isString, pluralize } from "~/lib/strings/utils";

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
});
