/**
 * Creates the unreachable union error, supporting the unreachable function.
 */
export const createUnreachableError = (action: string, message?: string) => {
  return new Error(message ?? `Unreachable action received for ${action}`);
};

/**
 * Throws an error when an unreachable action is received.
 *
 * Perfect for function endings that are guaranteed to never be reached, to be
 * able to return the full type, instead of undefined.
 *
 * @example Keeping a function return type complete.
 * ```ts
 * const foo = (): string => {
 *   // If statements.
 *   return unreachable("foo");
 * };
 * ```
 *
 * @param action - The action that was received, e.g. a function name.
 * @param message - The message to throw.
 */
export const unreachable = (action: string, message?: string) => {
  throw createUnreachableError(action, message);
};

/**
 * Immediately invoked function.
 *
 * Can be used for complex inline statements, often decisions.
 *
 * @example
 * ```ts
 * const foo = iife(() => {
 *   if (condition) {
 *     return "bar";
 *   }
 *   return "baz";
 * });
 * ```
 *
 * @example
 * ```ts
 * const variant = iife(() => {
 *   if (status === "accepted") return "constructive";
 *   if (status === "declined") return "destructive";
 *   return "default";
 * });
 * ```
 *
 * @param fn - The function to invoke.
 * @returns The result of the function.
 */
export const iife = <T>(fn: () => T) => fn();
