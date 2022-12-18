import { parseInput } from "./data/parse";
import { solve } from ".";

describe("day 13", () => {
  describe("data", () => {
    test("data should be correctly parsed", () => {
      const pairs = parseInput("test/input.txt");

      expect(pairs).toStrictEqual([
        [
          [1, 1, 3, 1, 1],
          [1, 1, 5, 1, 1],
        ],
        [
          [[1], [2, 3, 4]],
          [[1], 4],
        ],
        [[9], [[8, 7, 6]]],
        [
          [[4, 4], 4, 4],
          [[4, 4], 4, 4, 4],
        ],
        [
          [7, 7, 7, 7],
          [7, 7, 7],
        ],
        [[], [3]],
        [[[[]]], [[]]],
        [
          [1, [2, [3, [4, [5, 6, 7]]]], 8, 9],
          [1, [2, [3, [4, [5, 6, 0]]]], 8, 9],
        ],
      ]);
    });
  });
  describe("solution", () => {
    const solution = solve("test/input.txt");

    test("part 1 should return correct test score", () => {
      const expectedScore = 13;

      expect(solution[0]).toEqual(expectedScore);
    });

    test("part 2 should return correct test score", () => {
      const expectedScore = 140;

      expect(solution[1]).toEqual(expectedScore);
    });
  });
});
