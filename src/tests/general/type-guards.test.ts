import { expect, it, suite } from "vitest";
import {
  isNonEmptyArray,
  isObject,
  isPlainObject,
} from "~/lib/general/type-guards";

suite("type-guards", () => {
  it("initializes suite correctly", () => {
    expect("foo").toHaveLength(3);
  });

  suite("isObject", () => {
    it("returns true for plain objects", () => {
      expect(isObject({})).toBe(true);
      expect(isObject({ foo: "bar" })).toBe(true);
    });

    it("returns true for class instances", () => {
      class TestClass {}
      const instance = new TestClass();
      expect(isObject(instance)).toBe(true);
    });

    it("returns true for objects created with Object.create", () => {
      const obj = Object.create({ foo: "bar" });
      expect(isObject(obj)).toBe(true);
    });

    it("returns false for null", () => {
      expect(isObject(null)).toBe(false);
    });

    it("returns false for undefined", () => {
      expect(isObject(undefined)).toBe(false);
    });

    it("returns false for arrays", () => {
      expect(isObject([])).toBe(false);
      expect(isObject([1, 2, 3])).toBe(false);
    });

    it("returns false for strings", () => {
      expect(isObject("foo")).toBe(false);
      expect(isObject("")).toBe(false);
    });

    it("returns false for numbers", () => {
      expect(isObject(42)).toBe(false);
      expect(isObject(0)).toBe(false);
      expect(isObject(NaN)).toBe(false);
    });

    it("returns false for booleans", () => {
      expect(isObject(true)).toBe(false);
      expect(isObject(false)).toBe(false);
    });

    it("returns false for functions", () => {
      expect(isObject(() => {})).toBe(false);
      expect(isObject(function () {})).toBe(false);
    });

    it("returns false for symbols", () => {
      expect(isObject(Symbol("test"))).toBe(false);
    });
  });

  suite("isPlainObject", () => {
    it("returns true for plain objects", () => {
      expect(isPlainObject({})).toBe(true);
      expect(isPlainObject({ foo: "bar" })).toBe(true);
    });

    it("returns false for class instances", () => {
      class TestClass {}
      const instance = new TestClass();
      expect(isPlainObject(instance)).toBe(false);
    });

    it("returns true for objects created with Object.create", () => {
      const obj = Object.create({ foo: "bar" });
      expect(isPlainObject(obj)).toBe(true);
    });

    it("returns false for null", () => {
      expect(isPlainObject(null)).toBe(false);
    });

    it("returns false for undefined", () => {
      expect(isPlainObject(undefined)).toBe(false);
    });

    it("returns false for arrays", () => {
      expect(isPlainObject([])).toBe(false);
      expect(isPlainObject([1, 2, 3])).toBe(false);
    });

    it("returns false for strings", () => {
      expect(isPlainObject("foo")).toBe(false);
      expect(isPlainObject("")).toBe(false);
    });

    it("returns false for numbers", () => {
      expect(isPlainObject(42)).toBe(false);
      expect(isPlainObject(0)).toBe(false);
      expect(isPlainObject(NaN)).toBe(false);
    });

    it("returns false for booleans", () => {
      expect(isPlainObject(true)).toBe(false);
      expect(isPlainObject(false)).toBe(false);
    });

    it("returns false for functions", () => {
      expect(isPlainObject(() => {})).toBe(false);
      expect(isPlainObject(function () {})).toBe(false);
    });

    it("returns false for symbols", () => {
      expect(isPlainObject(Symbol("test"))).toBe(false);
    });

    it("returns false for built-in objects", () => {
      expect(isPlainObject(new Date())).toBe(false);
      expect(isPlainObject(new RegExp("test"))).toBe(false);
      expect(isPlainObject(new Map())).toBe(false);
      expect(isPlainObject(new Set())).toBe(false);
    });
  });

  suite("isNonEmptyArray", () => {
    it("returns true for non-empty arrays", () => {
      expect(isNonEmptyArray([1])).toBe(true);
      expect(isNonEmptyArray([1, 2, 3])).toBe(true);
      expect(isNonEmptyArray(["foo", "bar"])).toBe(true);
    });

    it("returns false for empty arrays", () => {
      expect(isNonEmptyArray([])).toBe(false);
    });
  });
});
