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

/**
 * Assures a value's existence, throwing an error if it is undefined.
 *
 * @returns The value, excluding undefined variants.
 */
export const getValueOrThrow = <T>(
  value?: T | undefined | null,
  message?: string,
  error = Error(message ?? "getValueOrThrow")
) => {
  if (value === undefined || value === null) throw error;

  return value;
};

/**
 * Randomizes the order of the items in the array.
 *
 * This function randomizes the order of the items in the array. It uses the
 * Fisher-Yates algorithm to shuffle the array The algorithm has a time
 * complexity of O(n).
 *
 * We start from the last element of the array and swap it with a random element
 * before it. Then we continue this process until we reach the first element of
 * the array.
 *
 * This ensures that every element has an equal chance of being placed at any
 * position in the array.
 */
export const randomize = <T>(items: T[]) => {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp: T = items[i] as T; // assert items[i] is not undefined
    items[i] = items[j] as T; // assert items[j] is not undefined
    items[j] = temp;
  }
  return items;
};
