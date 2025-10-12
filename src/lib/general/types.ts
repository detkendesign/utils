/**
 * Makes specific keys required.
 *
 * @example
 * type Test = RequireKeys<{
 *   a: number;
 *   b?: number;
 * }, "b">;
 * Result: { a: number; b: number }
 */
export type RequireKeys<T, K extends keyof T> = T & { [P in K]-?: T[P] };

/**
 * Maps strings to a type.
 *
 * @example
 * const userIdToUserMap: StringToTypeMap<User>;
 * userIdToUserMap["123"] = { name: "John Doe" };
 */
export type StringToTypeMap<T> = { [key in string]: T };

/**
 * Typesafe Omit.
 *
 * @example
 * type Test = TOmit<{ a: number; b: string }, "a">;
 *        ^ { b: string }
 */
export type TOmit<T, K extends keyof T> = Omit<T, K>;
