/**
 * Simple logging utility.
 */

enum LogLevel {
  ERROR = "ERROR",
  WARN = "WARN",
  INFO = "INFO",
}

/**
 * Internal function to log a message with a specific level.
 */
const log = (level: LogLevel, message: string) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${level}: ${message}`);
};

/**
 * Logger object with methods for different log levels. Enforces a unified
 * `logger.[level]` syntax.
 */
export const logger = {
  /**
   * Log an error message.
   */
  error: (message: string) => {
    log(LogLevel.ERROR, message);
  },

  /**
   * Log a warning message.
   */
  warn: (message: string) => {
    log(LogLevel.WARN, message);
  },

  /**
   * Log an info message.
   */
  info: (message: string) => {
    log(LogLevel.INFO, message);
  },
};
