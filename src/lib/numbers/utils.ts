import { unreachable } from "~/lib/general/utils";

/**
 * Checks if a value is a number.
 */
export const isNumber = (value: unknown): value is number =>
  typeof value === "number" && !Number.isNaN(value);

/**
 * Creates a comparison function for sorting objects by a number property in
 * ascending or descending order.
 *
 * @param dir - The sort direction.
 * @param keyExtractor - A function that extracts the number from the item being
 * sorted.
 * @returns A comparison function that can be used with Array.sort().
 *
 * @example
 * Sort an array of objects with a number property in ascending order.
 * ```ts
 * const items = [
 *   { id: x, followers: 59 },
 *   { id: y, followers: 42 },
 * ];
 * items.sort(
 *    getNumberSortFn('asc', item => item.followers)
 * );
 * ```
 * Result: [{ id: y, followers: 42 }, { id: x, followers: 59 }]
 *
 * @example
 * Sort an array of objects with a nested number property in descending order
 * ```ts
 * const items = [
 *   { id: x, nestedProperty: { followers: 59 }},
 *   { id: y, nestedProperty: { followers: 42 }},
 * ];
 * items.sort(
 *    getNumberSortFn('desc', post => post.nestedProperty.followers)
 * );
 * ```
 * Result: [{ id: x, ... }, { id: y, ... }]
 */
export const getNumberSortFn = <T>(
  dir: "asc" | "desc",
  keyExtractor: (item: T) => number
) => {
  return (a: T, b: T): number => {
    const numberA = keyExtractor(a);
    const numberB = keyExtractor(b);

    if (dir === "asc") return numberA - numberB;
    if (dir === "desc") return numberB - numberA;

    return unreachable("getNumberSortFn", "direction");
  };
};
