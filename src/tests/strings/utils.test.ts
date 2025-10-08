import { expect, it, suite } from "vitest";
import { pluralize } from "../../lib/strings/utils";

suite("strings", () => {
  it("initializes suite correctly", () => {
    expect("foo").toHaveLength(3);
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
