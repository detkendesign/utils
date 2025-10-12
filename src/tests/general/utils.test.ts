import { expect, it, suite } from "vitest";
import {
  createUnreachableError,
  getValueOrThrow,
  iife,
  unreachable,
} from "~/lib/general/utils";

suite("general utils", () => {
  it("initializes suite correctly", () => {
    expect("foo").toHaveLength(3);
  });

  suite("createUnreachableError", () => {
    it("creates an error with default message", () => {
      const error = createUnreachableError("testAction");
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("Unreachable action received for testAction");
    });

    it("creates an error with custom message", () => {
      const error = createUnreachableError(
        "testAction",
        "Custom error message"
      );
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("Custom error message");
    });
  });

  suite("unreachable", () => {
    it("throws an error with default message", () => {
      expect(() => unreachable("testAction")).toThrow(
        "Unreachable action received for testAction"
      );
    });

    it("throws an error with custom message", () => {
      expect(() => unreachable("testAction", "Custom error message")).toThrow(
        "Custom error message"
      );
    });

    it("throws an Error instance", () => {
      try {
        unreachable("testAction");
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  suite("iife", () => {
    it("returns the result of the function", () => {
      const result = iife(() => "hello");
      expect(result).toBe("hello");
    });

    it("works with number return types", () => {
      const result = iife(() => 42);
      expect(result).toBe(42);
    });

    it("works with object return types", () => {
      const result = iife(() => ({ foo: "bar" }));
      expect(result).toEqual({ foo: "bar" });
    });

    it("immediately invokes the function", () => {
      let invoked = false;
      iife(() => {
        invoked = true;
      });
      expect(invoked).toBe(true);
    });

    it("works with conditional logic", () => {
      const status = "accepted";
      const result = iife(() => {
        if (status === "accepted") return "constructive";
        if (status === "declined") return "destructive";
        return "default";
      });
      expect(result).toBe("constructive");
    });

    it("works with complex inline statements", () => {
      const condition = true;
      const result = iife(() => {
        if (condition) return "bar";
        return "baz";
      });
      expect(result).toBe("bar");
    });
  });

  suite("getValueOrThrow", () => {
    it("returns value when it is defined", () => {
      const result = getValueOrThrow("hello");
      expect(result).toBe("hello");
    });

    it("returns value when it is a number", () => {
      const result = getValueOrThrow(42);
      expect(result).toBe(42);
    });

    it("returns value when it is an object", () => {
      const obj = { foo: "bar" };
      const result = getValueOrThrow(obj);
      expect(result).toEqual(obj);
    });

    it("returns 0 without throwing", () => {
      const result = getValueOrThrow(0);
      expect(result).toBe(0);
    });

    it("returns false without throwing", () => {
      const result = getValueOrThrow(false);
      expect(result).toBe(false);
    });

    it("returns empty string without throwing", () => {
      const result = getValueOrThrow("");
      expect(result).toBe("");
    });

    it("throws when value is undefined with default message", () => {
      expect(() => getValueOrThrow(undefined)).toThrow("getValueOrThrow");
    });

    it("throws when value is null with default message", () => {
      expect(() => getValueOrThrow(null)).toThrow("getValueOrThrow");
    });

    it("throws with custom message when value is undefined", () => {
      expect(() => getValueOrThrow(undefined, "Custom error")).toThrow(
        "Custom error"
      );
    });

    it("throws with custom message when value is null", () => {
      expect(() => getValueOrThrow(null, "Value is required")).toThrow(
        "Value is required"
      );
    });

    it("throws custom error instance", () => {
      const customError = new TypeError("Type mismatch");
      expect(() => getValueOrThrow(undefined, "ignored", customError)).toThrow(
        TypeError
      );
      expect(() => getValueOrThrow(undefined, "ignored", customError)).toThrow(
        "Type mismatch"
      );
    });

    it("throws Error instance", () => {
      try {
        getValueOrThrow(undefined);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });
});
