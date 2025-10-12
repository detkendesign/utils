import { expect, it, suite, vi, beforeEach, afterEach } from "vitest";
import { createLogger, logger } from "~/lib/logger/index";

suite("logger", () => {
  it("initializes suite correctly", () => {
    expect(logger).toBeDefined();
  });

  suite("createLogger", () => {
    let consoleLogSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
      consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    });

    afterEach(() => {
      consoleLogSpy.mockRestore();
    });

    suite("without scope", () => {
      it("logs error messages without prefix", () => {
        const testLogger = createLogger();
        testLogger.error("test error message");

        expect(consoleLogSpy).toHaveBeenCalledTimes(1);
        const loggedMessage = consoleLogSpy.mock.calls[0][0] as string;
        expect(loggedMessage).toContain("ERROR:");
        expect(loggedMessage).toContain("test error message");
        expect(loggedMessage).toMatch(/\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
      });

      it("logs warn messages without prefix", () => {
        const testLogger = createLogger();
        testLogger.warn("test warn message");

        expect(consoleLogSpy).toHaveBeenCalledTimes(1);
        const loggedMessage = consoleLogSpy.mock.calls[0][0] as string;
        expect(loggedMessage).toContain("WARN:");
        expect(loggedMessage).toContain("test warn message");
      });

      it("logs info messages without prefix", () => {
        const testLogger = createLogger();
        testLogger.info("test info message");

        expect(consoleLogSpy).toHaveBeenCalledTimes(1);
        const loggedMessage = consoleLogSpy.mock.calls[0][0] as string;
        expect(loggedMessage).toContain("INFO:");
        expect(loggedMessage).toContain("test info message");
      });
    });

    suite("with scope", () => {
      it("logs error messages with scope prefix", () => {
        const testLogger = createLogger("AuthService");
        testLogger.error("authentication failed");

        expect(consoleLogSpy).toHaveBeenCalledTimes(1);
        const loggedMessage = consoleLogSpy.mock.calls[0][0] as string;
        expect(loggedMessage).toContain("ERROR:");
        expect(loggedMessage).toContain("[AuthService]");
        expect(loggedMessage).toContain("authentication failed");
      });

      it("logs warn messages with scope prefix", () => {
        const testLogger = createLogger("DatabaseService");
        testLogger.warn("connection slow");

        expect(consoleLogSpy).toHaveBeenCalledTimes(1);
        const loggedMessage = consoleLogSpy.mock.calls[0][0] as string;
        expect(loggedMessage).toContain("WARN:");
        expect(loggedMessage).toContain("[DatabaseService]");
        expect(loggedMessage).toContain("connection slow");
      });

      it("logs info messages with scope prefix", () => {
        const testLogger = createLogger("APIService");
        testLogger.info("request processed");

        expect(consoleLogSpy).toHaveBeenCalledTimes(1);
        const loggedMessage = consoleLogSpy.mock.calls[0][0] as string;
        expect(loggedMessage).toContain("INFO:");
        expect(loggedMessage).toContain("[APIService]");
        expect(loggedMessage).toContain("request processed");
      });
    });

    suite("message format", () => {
      it("includes timestamp in ISO format", () => {
        const testLogger = createLogger();
        testLogger.info("test message");

        const loggedMessage = consoleLogSpy.mock.calls[0][0] as string;
        expect(loggedMessage).toMatch(
          /^\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z\] INFO: test message$/
        );
      });

      it("formats message with scope correctly", () => {
        const testLogger = createLogger("TestScope");
        testLogger.error("error occurred");

        const loggedMessage = consoleLogSpy.mock.calls[0][0] as string;
        expect(loggedMessage).toMatch(
          /^\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z\] ERROR: \[TestScope\] error occurred$/
        );
      });
    });
  });

  suite("default logger", () => {
    let consoleLogSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
      consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    });

    afterEach(() => {
      consoleLogSpy.mockRestore();
    });

    it("logs error messages without prefix", () => {
      logger.error("default error");

      expect(consoleLogSpy).toHaveBeenCalledTimes(1);
      const loggedMessage = consoleLogSpy.mock.calls[0][0] as string;
      expect(loggedMessage).toContain("ERROR:");
      expect(loggedMessage).toContain("default error");
    });

    it("logs warn messages without prefix", () => {
      logger.warn("default warning");

      expect(consoleLogSpy).toHaveBeenCalledTimes(1);
      const loggedMessage = consoleLogSpy.mock.calls[0][0] as string;
      expect(loggedMessage).toContain("WARN:");
      expect(loggedMessage).toContain("default warning");
    });

    it("logs info messages without prefix", () => {
      logger.info("default info");

      expect(consoleLogSpy).toHaveBeenCalledTimes(1);
      const loggedMessage = consoleLogSpy.mock.calls[0][0] as string;
      expect(loggedMessage).toContain("INFO:");
      expect(loggedMessage).toContain("default info");
    });
  });
});
