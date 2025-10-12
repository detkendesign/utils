import { unreachable } from "~/lib/general/utils";

/**
 * Creates a comparison function for sorting objects by date in ascending or descending order.
 *
 * @param dir - The sort direction.
 * @param keyExtractor - A function that extracts the Date object from the item being sorted.
 * @returns A comparison function that can be used with Array.sort().
 *
 * @example
 * Sort an array of objects with date property in ascending order.
 * ```ts
 * const items = [
 *   { id: 1, metaCreatedAt: getDate('2024-01-01') },
 *   { id: 2, metaCreatedAt: getDate('2023-12-31') },
 * ];
 * items.sort(
 *    getDateSortFn('asc', item => item.date)
 * );
 * ```
 * Result: [{ id: 2, date: '2023-12-31' }, { id: 1, date: '2024-01-01' }]
 *
 * @example
 * Sort an array of objects with nested date property in descending order
 * ```ts
 * const posts = [
 *   { id: 1, nestedProperty: { createdAt: getDate('2024-01-01') }},
 *   { id: 2, nestedProperty: { createdAt: getDate('2024-01-02') }},
 * ];
 * posts.sort(
 *    getDateSortFn('desc', post => post.nestedProperty.createdAt)
 * );
 * ```
 * Result: [{ id: 2, ... }, { id: 1, ... }]
 */
export const getDateSortFn = <T>(
  dir: "asc" | "desc",
  keyExtractor: (item: T) => Date
) => {
  return (a: T, b: T): number => {
    // The + before new Date is converts the Date object to a number.
    const millisecondsA = +new Date(keyExtractor(a));
    const millisecondsB = +new Date(keyExtractor(b));

    if (dir === "asc") return millisecondsA - millisecondsB;
    if (dir === "desc") return millisecondsB - millisecondsA;

    return unreachable("getDateSortFn", "direction");
  };
};
