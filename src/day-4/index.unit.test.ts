import { parseInput, RangePair } from "./data/parse";
import { solve } from ".";

describe("day 4", () => {
  describe("data", () => {
    test("data should be correctly parsed", () => {
      const rangePair: RangePair[] = parseInput("test/input.txt");

      expect(rangePair.length).toStrictEqual(6);
      expect(rangePair[0]).toStrictEqual([
        [2, 4],
        [6, 8],
      ]);
      expect(rangePair[rangePair.length - 1]).toStrictEqual([
        [2, 6],
        [4, 8],
      ]);
    });
  });
  describe("solution", () => {
    const solution = solve("test/input.txt");

    test("part 1 should return correct test score", () => {
      const expectedScore = 2;

      expect(solution[0]).toEqual(expectedScore);
    });

    test("part 2 should return correct test score", () => {
      const expectedScore = 4;

      expect(solution[1]).toEqual(expectedScore);
    });
  });
});
