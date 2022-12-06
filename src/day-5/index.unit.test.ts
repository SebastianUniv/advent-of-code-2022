import { parseInput } from "./data/parse";
import { solve } from ".";

describe("day 5", () => {
  describe("data", () => {
    test("data should be correctly parsed", () => {
      const [cratesByStacks, moves] = parseInput("test/input.txt");

      expect(cratesByStacks).toStrictEqual([
        ["Z", "N"],
        ["M", "C", "D"],
        ["P"],
      ]);

      expect(moves).toStrictEqual([
        [1, 2, 1],
        [3, 1, 3],
        [2, 2, 1],
        [1, 1, 2],
      ]);
    });
  });
  describe("solution", () => {
    const solution = solve("test/input.txt");
    test("part 1 should return correct test score", () => {
      const expectedScore = "CMZ";

      expect(solution[0]).toEqual(expectedScore);
    });

    test("part 2 should return correct test score", () => {
      const expectedScore = "MCD";

      expect(solution[1]).toEqual(expectedScore);
    });
  });
});
