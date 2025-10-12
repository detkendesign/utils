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

/**
 * Generates a random integer between two numbers.
 *
 * @param min - The minimum value, inclusive.
 * @param max - The maximum value, exclusive.
 * @returns A random integer between the two numbers.
 */
export const getRandomInt = (min: number, max: number) => {
  const minToCeil = Math.ceil(min);
  const maxToFloor = Math.floor(max);
  return Math.floor(Math.random() * (maxToFloor - minToCeil)) + minToCeil;
};

/**
 * Generates a random floating-point number between two numbers.
 *
 * @param min - The minimum value, inclusive.
 * @param max - The maximum value, exclusive.
 * @returns A random floating-point number between the two numbers.
 */
export const getRandomFloat = (max: number, min: number) =>
  Math.random() * (max - min) + min;

/**
 * Returns a random value based on weighted probabilities.
 *
 * @param options - A non-empty array of tuples where each tuple contains [value, weight].
 * Weights should sum to 1.0 for percentages, but any positive numbers work as relative weights.
 *
 * @example
 * // 70% chance of 2, 30% chance of 1.
 * getWeightedRandom([[1, 0.3], [2, 0.7]])
 *
 * @example
 * // Using relative weights (3:2:1 ratio).
 * getWeightedRandom([["a", 3], ["b", 2], ["c", 1]])
 */
export const getWeightedRandom = <T>(
  options: readonly (readonly [T, number])[]
): T => {
  const totalWeight = options.reduce((sum, [_, weight]) => sum + weight, 0);
  const random = Math.random() * totalWeight;

  let cumulativeWeight = 0;
  for (const [value, weight] of options) {
    cumulativeWeight += weight;
    if (random < cumulativeWeight) return value;
  }

  // Fallback: Should only be reached with zero/negative weights.
  return (
    options[0]?.[0] || unreachable("getWeightedRandom", "No options provided")
  );
};
