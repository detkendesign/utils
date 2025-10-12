import { expect, it, suite } from "vitest";
import { createUnreachableError, unreachable } from "~/lib/general/utils";

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
});
