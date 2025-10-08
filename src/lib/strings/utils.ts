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
