/**
 * Simple logging utility.
 */

enum LogLevel {
  ERROR = "ERROR",
  WARN = "WARN",
  INFO = "INFO",
}

type Logger = {
  error: (message: string) => void;
  warn: (message: string) => void;
  info: (message: string) => void;
};

/**
 * Internal function to log a message with a specific level.
 */
const log = (level: LogLevel, message: string, prefix?: string) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${level}: ${prefix}${message}`);
};

/**
 * Creates a logger instance with optional service name prefixing.
 *
 * @param scope - Optional scope to prefix all log messages, e.g. a service or module name.
 * @returns Logger instance with error, warn, and info methods.
 *
 * @example
 * const logger = createLogger('AuthService');
 * logger.info('User logged in'); // [2025-10-12T...] INFO: [AuthService] User logged in
 */
export const createLogger = (scope?: string): Logger => {
  const prefix = scope ? `[${scope}] ` : "";

  return {
    error: (message: string) => {
      log(LogLevel.ERROR, message, prefix);
    },

    warn: (message: string) => {
      log(LogLevel.WARN, message, prefix);
    },

    info: (message: string) => {
      log(LogLevel.INFO, message, prefix);
    },
  };
};

/**
 * Default logger instance without service name prefix.
 */
export const logger: Logger = createLogger();
