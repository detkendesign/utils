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
