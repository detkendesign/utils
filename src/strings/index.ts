/** Gets the singular or plural version of a word based on its count. */
export function pluralize(
  count: number,
  singular: string,
  plural?: string
): string {
  return count === 1 ? singular : plural || singular + "s";
}
