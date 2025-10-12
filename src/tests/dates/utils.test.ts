import { expect, it, suite } from "vitest";
import { getDateSortFn } from "~/lib/dates/utils";

suite("dates", () => {
  it("initializes suite correctly", () => {
    expect("foo").toHaveLength(3);
  });

  suite("getDateSortFn", () => {
    it("sorts array in ascending order", () => {
      const items = [
        { id: 1, date: new Date("2024-01-15") },
        { id: 2, date: new Date("2024-01-01") },
        { id: 3, date: new Date("2024-01-30") },
      ];
      const sorted = items.sort(getDateSortFn("asc", (item) => item.date));
      expect(sorted).toEqual([
        { id: 2, date: new Date("2024-01-01") },
        { id: 1, date: new Date("2024-01-15") },
        { id: 3, date: new Date("2024-01-30") },
      ]);
    });

    it("sorts array in descending order", () => {
      const items = [
        { id: 1, date: new Date("2024-01-15") },
        { id: 2, date: new Date("2024-01-01") },
        { id: 3, date: new Date("2024-01-30") },
      ];
      const sorted = items.sort(getDateSortFn("desc", (item) => item.date));
      expect(sorted).toEqual([
        { id: 3, date: new Date("2024-01-30") },
        { id: 1, date: new Date("2024-01-15") },
        { id: 2, date: new Date("2024-01-01") },
      ]);
    });

    it("sorts array with nested properties in ascending order", () => {
      const items = [
        { id: 1, nestedProperty: { createdAt: new Date("2024-01-02") } },
        { id: 2, nestedProperty: { createdAt: new Date("2024-01-01") } },
      ];
      const sorted = items.sort(
        getDateSortFn("asc", (item) => item.nestedProperty.createdAt)
      );
      expect(sorted).toEqual([
        { id: 2, nestedProperty: { createdAt: new Date("2024-01-01") } },
        { id: 1, nestedProperty: { createdAt: new Date("2024-01-02") } },
      ]);
    });

    it("sorts array with nested properties in descending order", () => {
      const items = [
        { id: 1, nestedProperty: { createdAt: new Date("2024-01-01") } },
        { id: 2, nestedProperty: { createdAt: new Date("2024-01-02") } },
      ];
      const sorted = items.sort(
        getDateSortFn("desc", (item) => item.nestedProperty.createdAt)
      );
      expect(sorted).toEqual([
        { id: 2, nestedProperty: { createdAt: new Date("2024-01-02") } },
        { id: 1, nestedProperty: { createdAt: new Date("2024-01-01") } },
      ]);
    });

    it("handles empty array", () => {
      const items: { id: number; date: Date }[] = [];
      const sorted = items.sort(getDateSortFn("asc", (item) => item.date));
      expect(sorted).toEqual([]);
    });

    it("handles single item array", () => {
      const items = [{ id: 1, date: new Date("2024-01-01") }];
      const sorted = items.sort(getDateSortFn("asc", (item) => item.date));
      expect(sorted).toEqual([{ id: 1, date: new Date("2024-01-01") }]);
    });

    it("handles already sorted array in ascending order", () => {
      const items = [
        { id: 1, date: new Date("2024-01-01") },
        { id: 2, date: new Date("2024-01-02") },
        { id: 3, date: new Date("2024-01-03") },
      ];
      const sorted = items.sort(getDateSortFn("asc", (item) => item.date));
      expect(sorted).toEqual([
        { id: 1, date: new Date("2024-01-01") },
        { id: 2, date: new Date("2024-01-02") },
        { id: 3, date: new Date("2024-01-03") },
      ]);
    });

    it("handles equal dates", () => {
      const items = [
        { id: 1, date: new Date("2024-01-01") },
        { id: 2, date: new Date("2024-01-01") },
        { id: 3, date: new Date("2024-01-01") },
      ];
      const sorted = items.sort(getDateSortFn("asc", (item) => item.date));
      expect(sorted).toHaveLength(3);
      expect(
        sorted.every(
          (item) => item.date.getTime() === new Date("2024-01-01").getTime()
        )
      ).toBe(true);
    });

    it("handles dates across different years", () => {
      const items = [
        { id: 1, date: new Date("2024-06-15") },
        { id: 2, date: new Date("2023-01-01") },
        { id: 3, date: new Date("2025-12-31") },
      ];
      const sorted = items.sort(getDateSortFn("asc", (item) => item.date));
      expect(sorted).toEqual([
        { id: 2, date: new Date("2023-01-01") },
        { id: 1, date: new Date("2024-06-15") },
        { id: 3, date: new Date("2025-12-31") },
      ]);
    });

    it("handles dates with time components", () => {
      const items = [
        { id: 1, date: new Date("2024-01-01T15:30:00") },
        { id: 2, date: new Date("2024-01-01T10:00:00") },
        { id: 3, date: new Date("2024-01-01T20:45:00") },
      ];
      const sorted = items.sort(getDateSortFn("asc", (item) => item.date));
      expect(sorted).toEqual([
        { id: 2, date: new Date("2024-01-01T10:00:00") },
        { id: 1, date: new Date("2024-01-01T15:30:00") },
        { id: 3, date: new Date("2024-01-01T20:45:00") },
      ]);
    });

    it("handles dates with millisecond precision", () => {
      const items = [
        { id: 1, date: new Date("2024-01-01T12:00:00.500") },
        { id: 2, date: new Date("2024-01-01T12:00:00.100") },
        { id: 3, date: new Date("2024-01-01T12:00:00.900") },
      ];
      const sorted = items.sort(getDateSortFn("asc", (item) => item.date));
      expect(sorted).toEqual([
        { id: 2, date: new Date("2024-01-01T12:00:00.100") },
        { id: 1, date: new Date("2024-01-01T12:00:00.500") },
        { id: 3, date: new Date("2024-01-01T12:00:00.900") },
      ]);
    });

    it("handles very old dates", () => {
      const items = [
        { id: 1, date: new Date("2000-01-01") },
        { id: 2, date: new Date("1990-06-15") },
        { id: 3, date: new Date("1985-12-25") },
      ];
      const sorted = items.sort(getDateSortFn("asc", (item) => item.date));
      expect(sorted).toEqual([
        { id: 3, date: new Date("1985-12-25") },
        { id: 2, date: new Date("1990-06-15") },
        { id: 1, date: new Date("2000-01-01") },
      ]);
    });
  });
});
