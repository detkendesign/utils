import { expect, it, suite } from "vitest";
import { createUnreachableError, iife, unreachable } from "~/lib/general/utils";

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
});
