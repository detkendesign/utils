import { NonEmptyArray } from "~/lib/general/types";

/**
 * Checks if a value is a plain object or instance of a class.
 */
export const isObject = <T extends object = object>(
  value: unknown
): value is T =>
  value != null && typeof value == "object" && !Array.isArray(value);

/**
 * Checks if a value is a plain javascript object.
 */
export const isPlainObject = (value: unknown) =>
  value != null &&
  typeof value == "object" &&
  !Array.isArray(value) &&
  value.constructor === Object;

/**
 * Checks if a value is a non-empty array.
 */
export const isNonEmptyArray = <T>(value: T[]): value is NonEmptyArray<T> =>
  !!value.length;
