import { expect, it, suite } from "vitest";
import {
  getNumberSortFn,
  getRandomFloat,
  getRandomInt,
  getWeightedRandom,
  isNumber,
} from "~/lib/numbers/utils";

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

  suite("getRandomInt", () => {
    it("returns an integer within range", () => {
      const result = getRandomInt(0, 10);
      expect(Number.isInteger(result)).toBe(true);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(10);
    });

    it("includes min value", () => {
      const results: number[] = [];
      for (let i = 0; i < 100; i++) {
        results.push(getRandomInt(5, 7));
      }
      expect(results).toContain(5);
    });

    it("excludes max value", () => {
      const results: number[] = [];
      for (let i = 0; i < 100; i++) {
        results.push(getRandomInt(0, 2));
      }
      expect(results.every((r) => r < 2)).toBe(true);
    });

    it("works with negative numbers", () => {
      const result = getRandomInt(-10, -5);
      expect(Number.isInteger(result)).toBe(true);
      expect(result).toBeGreaterThanOrEqual(-10);
      expect(result).toBeLessThan(-5);
    });

    it("works with range crossing zero", () => {
      const result = getRandomInt(-5, 5);
      expect(Number.isInteger(result)).toBe(true);
      expect(result).toBeGreaterThanOrEqual(-5);
      expect(result).toBeLessThan(5);
    });

    it("works with large ranges", () => {
      const result = getRandomInt(0, 1000);
      expect(Number.isInteger(result)).toBe(true);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(1000);
    });

    it("handles decimal min and max by ceiling min and flooring max", () => {
      const result = getRandomInt(1.7, 5.9);
      expect(Number.isInteger(result)).toBe(true);
      expect(result).toBeGreaterThanOrEqual(2);
      expect(result).toBeLessThan(5);
    });

    it("returns different values on multiple calls", () => {
      const results = new Set<number>();
      for (let i = 0; i < 50; i++) {
        results.add(getRandomInt(0, 100));
      }
      expect(results.size).toBeGreaterThan(10);
    });

    it("returns min when range is very small after ceiling and flooring", () => {
      const results: number[] = [];
      for (let i = 0; i < 10; i++) {
        results.push(getRandomInt(1, 2));
      }
      expect(results.every((r) => r === 1)).toBe(true);
    });

    it("works with zero as min", () => {
      const result = getRandomInt(0, 5);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(5);
    });

    it("works with zero in the range", () => {
      const result = getRandomInt(-2, 2);
      expect(result).toBeGreaterThanOrEqual(-2);
      expect(result).toBeLessThan(2);
    });
  });

  suite("getRandomFloat", () => {
    it("returns a float within range", () => {
      const result = getRandomFloat(10, 0);
      expect(typeof result).toBe("number");
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(10);
    });

    it("can return decimal values", () => {
      const results: number[] = [];
      for (let i = 0; i < 10; i++) {
        results.push(getRandomFloat(10, 0));
      }
      const hasDecimal = results.some((r) => !Number.isInteger(r));
      expect(hasDecimal).toBe(true);
    });

    it("works with negative numbers", () => {
      const result = getRandomFloat(-5, -10);
      expect(result).toBeGreaterThanOrEqual(-10);
      expect(result).toBeLessThan(-5);
    });

    it("works with range crossing zero", () => {
      const result = getRandomFloat(5, -5);
      expect(result).toBeGreaterThanOrEqual(-5);
      expect(result).toBeLessThan(5);
    });

    it("works with decimal min and max", () => {
      const result = getRandomFloat(5.5, 1.5);
      expect(result).toBeGreaterThanOrEqual(1.5);
      expect(result).toBeLessThan(5.5);
    });

    it("returns different values on multiple calls", () => {
      const results: number[] = [];
      for (let i = 0; i < 10; i++) {
        results.push(getRandomFloat(100, 0));
      }
      const uniqueResults = new Set(results);
      expect(uniqueResults.size).toBeGreaterThan(5);
    });

    it("works with zero as min", () => {
      const result = getRandomFloat(10, 0);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(10);
    });

    it("works with zero in the range", () => {
      const result = getRandomFloat(5, -5);
      expect(result).toBeGreaterThanOrEqual(-5);
      expect(result).toBeLessThan(5);
    });

    it("works with very small ranges", () => {
      const result = getRandomFloat(0.2, 0.1);
      expect(result).toBeGreaterThanOrEqual(0.1);
      expect(result).toBeLessThan(0.2);
    });

    it("handles max and min in correct order", () => {
      const result = getRandomFloat(100, 50);
      expect(result).toBeGreaterThanOrEqual(50);
      expect(result).toBeLessThan(100);
    });
  });

  suite("getWeightedRandom", () => {
    it("returns one of the provided values", () => {
      const options = [
        ["a", 1],
        ["b", 1],
        ["c", 1],
      ] as const;
      const result = getWeightedRandom(options);
      expect(["a", "b", "c"]).toContain(result);
    });

    it("works with single option", () => {
      const options = [["only", 1]] as const;
      const result = getWeightedRandom(options);
      expect(result).toBe("only");
    });

    it("favors higher weighted options", () => {
      const options = [
        ["rare", 1],
        ["common", 99],
      ] as const;
      const results: string[] = [];

      for (let i = 0; i < 100; i++) {
        results.push(getWeightedRandom(options));
      }

      const commonCount = results.filter((r) => r === "common").length;
      expect(commonCount).toBeGreaterThan(80);
    });

    it("works with equal weights", () => {
      const options = [
        ["a", 1],
        ["b", 1],
        ["c", 1],
      ] as const;
      const results: string[] = [];

      for (let i = 0; i < 90; i++) {
        results.push(getWeightedRandom(options));
      }

      const uniqueResults = new Set(results);
      expect(uniqueResults.size).toBeGreaterThan(1);
    });

    it("works with different weight ratios", () => {
      const options = [
        ["low", 1],
        ["medium", 5],
        ["high", 10],
      ] as const;
      const results: string[] = [];

      for (let i = 0; i < 160; i++) {
        results.push(getWeightedRandom(options));
      }

      const highCount = results.filter((r) => r === "high").length;
      const mediumCount = results.filter((r) => r === "medium").length;
      const lowCount = results.filter((r) => r === "low").length;

      expect(highCount).toBeGreaterThan(mediumCount);
      expect(mediumCount).toBeGreaterThan(lowCount);
    });

    it("works with number values", () => {
      const options = [
        [1, 10],
        [2, 20],
        [3, 30],
      ] as const;
      const result = getWeightedRandom(options);
      expect([1, 2, 3]).toContain(result);
    });

    it("works with object values", () => {
      const obj1 = { id: 1, name: "first" };
      const obj2 = { id: 2, name: "second" };
      const options = [
        [obj1, 1],
        [obj2, 1],
      ] as const;
      const result = getWeightedRandom(options);
      expect([obj1, obj2]).toContain(result);
    });

    it("works with very unbalanced weights", () => {
      const options = [
        ["rare", 1],
        ["common", 1000],
      ] as const;
      const results: string[] = [];

      for (let i = 0; i < 100; i++) {
        results.push(getWeightedRandom(options));
      }

      const commonCount = results.filter((r) => r === "common").length;
      expect(commonCount).toBeGreaterThan(95);
    });

    it("works with decimal weights", () => {
      const options = [
        ["a", 0.5],
        ["b", 0.3],
        ["c", 0.2],
      ] as const;
      const result = getWeightedRandom(options);
      expect(["a", "b", "c"]).toContain(result);
    });

    it("handles large number of options", () => {
      const options = Array.from({ length: 100 }, (_, i) => [
        `option${i}`,
        1,
      ]) as [string, number][];
      const result = getWeightedRandom(options);
      expect(result).toMatch(/^option\d+$/);
    });

    it("returns first option when all weights are zero", () => {
      const options = [
        ["first", 0],
        ["second", 0],
      ] as const;
      const result = getWeightedRandom(options);
      expect(result).toBe("first");
    });

    it("handles mix of zero and positive weights", () => {
      const options = [
        ["zero", 0],
        ["positive", 10],
      ] as const;
      const results: string[] = [];

      for (let i = 0; i < 50; i++) {
        results.push(getWeightedRandom(options));
      }

      expect(results.every((r) => r === "positive")).toBe(true);
    });

    it("throws when no options provided", () => {
      const options: [string, number][] = [];
      expect(() => getWeightedRandom(options)).toThrow();
    });

    it("preserves reference identity", () => {
      const obj = { id: 1 };
      const options = [[obj, 1]] as const;
      const result = getWeightedRandom(options);
      expect(result).toBe(obj);
    });

    it("works with boolean values", () => {
      const options = [
        [true, 1],
        [false, 1],
      ] as const;
      const result = getWeightedRandom(options);
      expect(typeof result).toBe("boolean");
    });

    it("returns consistent types", () => {
      const options = [
        ["a", 1],
        ["b", 1],
        ["c", 1],
      ] as const;

      for (let i = 0; i < 20; i++) {
        const result = getWeightedRandom(options);
        expect(typeof result).toBe("string");
      }
    });
  });
});
