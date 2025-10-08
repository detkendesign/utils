/** Checks if a value is a string. */
export const isString = (value: unknown): value is string =>
  typeof value === "string";

/** Gets the singular or plural version of a word based on its count. */
export const pluralize = (
  count: number,
  singular: string,
  plural?: string
): string => {
  return count === 1 ? singular : plural || singular + "s";
};

/**
 * Safely parse a JSON string to an object.
 *
 * @param value - The JSON string to parse.
 * @param T - The type of the object to parse the JSON string to.
 *
 * @returns An object or `undefined` when the string is an invalid json.
 *
 * @example
 * ```ts
 * const obj = safeParseJSON<{ foo: string }>("{\"foo\":\"bar\"}");
 * console.log(obj); // { foo: "bar" }
 * ```
 */
export const safeParseJSON = <T = unknown>(value: string) => {
  if (!value) return undefined;

  try {
    return JSON.parse(value) as T;
  } catch {
    return undefined;
  }
};

/**
 * Simple hash function to convert a string to a number within a specified
 * range.
 *
 * This can be useful to generate a consistent random number from a string.
 *
 * @param str - The input string to hash.
 * @param range - The maximum value of the desired range, exlusive.
 * @returns A number: [0;range).
 */
export const hashStringToNumber = (str: string, range?: number) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // Convert to 32-bit integer.
  }
  // Constrains the result to [0, range).
  if (range) return Math.abs(hash) % range;
  return Math.abs(hash);
};
