import { expect, it, suite } from "vitest";
import { getNumberSortFn, isNumber } from "~/lib/numbers/utils";

suite("numbers", () => {
  it("initializes suite correctly", () => {
    expect("foo").toHaveLength(3);
  });

  suite("getNumberSortFn", () => {
    it("sorts array in ascending order", () => {
      const items = [
        { id: "x", followers: 59 },
        { id: "y", followers: 42 },
        { id: "z", followers: 100 },
      ];
      const sorted = items.sort(
        getNumberSortFn("asc", (item) => item.followers)
      );
      expect(sorted).toEqual([
        { id: "y", followers: 42 },
        { id: "x", followers: 59 },
        { id: "z", followers: 100 },
      ]);
    });

    it("sorts array in descending order", () => {
      const items = [
        { id: "x", followers: 59 },
        { id: "y", followers: 42 },
        { id: "z", followers: 100 },
      ];
      const sorted = items.sort(
        getNumberSortFn("desc", (item) => item.followers)
      );
      expect(sorted).toEqual([
        { id: "z", followers: 100 },
        { id: "x", followers: 59 },
        { id: "y", followers: 42 },
      ]);
    });

    it("sorts array with nested properties in ascending order", () => {
      const items = [
        { id: "x", nestedProperty: { followers: 59 } },
        { id: "y", nestedProperty: { followers: 42 } },
      ];
      const sorted = items.sort(
        getNumberSortFn("asc", (item) => item.nestedProperty.followers)
      );
      expect(sorted).toEqual([
        { id: "y", nestedProperty: { followers: 42 } },
        { id: "x", nestedProperty: { followers: 59 } },
      ]);
    });

    it("sorts array with nested properties in descending order", () => {
      const items = [
        { id: "x", nestedProperty: { followers: 59 } },
        { id: "y", nestedProperty: { followers: 42 } },
      ];
      const sorted = items.sort(
        getNumberSortFn("desc", (item) => item.nestedProperty.followers)
      );
      expect(sorted).toEqual([
        { id: "x", nestedProperty: { followers: 59 } },
        { id: "y", nestedProperty: { followers: 42 } },
      ]);
    });

    it("handles empty array", () => {
      const items: { id: string; value: number }[] = [];
      const sorted = items.sort(getNumberSortFn("asc", (item) => item.value));
      expect(sorted).toEqual([]);
    });

    it("handles single item array", () => {
      const items = [{ id: "x", value: 42 }];
      const sorted = items.sort(getNumberSortFn("asc", (item) => item.value));
      expect(sorted).toEqual([{ id: "x", value: 42 }]);
    });

    it("handles already sorted array in ascending order", () => {
      const items = [
        { id: "x", value: 1 },
        { id: "y", value: 2 },
        { id: "z", value: 3 },
      ];
      const sorted = items.sort(getNumberSortFn("asc", (item) => item.value));
      expect(sorted).toEqual([
        { id: "x", value: 1 },
        { id: "y", value: 2 },
        { id: "z", value: 3 },
      ]);
    });

    it("handles equal values", () => {
      const items = [
        { id: "x", value: 42 },
        { id: "y", value: 42 },
        { id: "z", value: 42 },
      ];
      const sorted = items.sort(getNumberSortFn("asc", (item) => item.value));
      expect(sorted).toHaveLength(3);
      expect(sorted.every((item) => item.value === 42)).toBe(true);
    });

    it("handles negative numbers", () => {
      const items = [
        { id: "x", value: -10 },
        { id: "y", value: 5 },
        { id: "z", value: -20 },
      ];
      const sorted = items.sort(getNumberSortFn("asc", (item) => item.value));
      expect(sorted).toEqual([
        { id: "z", value: -20 },
        { id: "x", value: -10 },
        { id: "y", value: 5 },
      ]);
    });

    it("handles zero values", () => {
      const items = [
        { id: "x", value: 10 },
        { id: "y", value: 0 },
        { id: "z", value: -5 },
      ];
      const sorted = items.sort(getNumberSortFn("asc", (item) => item.value));
      expect(sorted).toEqual([
        { id: "z", value: -5 },
        { id: "y", value: 0 },
        { id: "x", value: 10 },
      ]);
    });

    it("handles decimal numbers", () => {
      const items = [
        { id: "x", value: 1.5 },
        { id: "y", value: 1.2 },
        { id: "z", value: 1.8 },
      ];
      const sorted = items.sort(getNumberSortFn("asc", (item) => item.value));
      expect(sorted).toEqual([
        { id: "y", value: 1.2 },
        { id: "x", value: 1.5 },
        { id: "z", value: 1.8 },
      ]);
    });
  });

  suite("isNumber", () => {
    it("returns true for positive integers", () => {
      expect(isNumber(42)).toBe(true);
      expect(isNumber(1)).toBe(true);
      expect(isNumber(999)).toBe(true);
    });

    it("returns true for negative integers", () => {
      expect(isNumber(-42)).toBe(true);
      expect(isNumber(-1)).toBe(true);
    });

    it("returns true for zero", () => {
      expect(isNumber(0)).toBe(true);
    });

    it("returns true for decimal numbers", () => {
      expect(isNumber(3.14)).toBe(true);
      expect(isNumber(0.5)).toBe(true);
      expect(isNumber(-2.7)).toBe(true);
    });

    it("returns true for Infinity", () => {
      expect(isNumber(Infinity)).toBe(true);
      expect(isNumber(-Infinity)).toBe(true);
    });

    it("returns false for NaN", () => {
      expect(isNumber(NaN)).toBe(false);
      expect(isNumber(Number.NaN)).toBe(false);
    });

    it("returns false for strings", () => {
      expect(isNumber("42")).toBe(false);
      expect(isNumber("hello")).toBe(false);
      expect(isNumber("")).toBe(false);
    });

    it("returns false for null", () => {
      expect(isNumber(null)).toBe(false);
    });

    it("returns false for undefined", () => {
      expect(isNumber(undefined)).toBe(false);
    });

    it("returns false for booleans", () => {
      expect(isNumber(true)).toBe(false);
      expect(isNumber(false)).toBe(false);
    });

    it("returns false for objects", () => {
      expect(isNumber({})).toBe(false);
      expect(isNumber({ value: 42 })).toBe(false);
    });

    it("returns false for arrays", () => {
      expect(isNumber([])).toBe(false);
      expect(isNumber([1, 2, 3])).toBe(false);
    });

    it("returns false for functions", () => {
      expect(isNumber(() => 42)).toBe(false);
    });

    it("returns false for numeric strings", () => {
      expect(isNumber("123")).toBe(false);
      expect(isNumber("3.14")).toBe(false);
    });
  });
});
