import { parseInput } from "./data/parse";
import { solve } from ".";

describe("day 14", () => {
  describe("data", () => {
    test("data should be correctly parsed", () => {
      const [map, range] = parseInput("test/input.txt");

      expect(map).toStrictEqual([
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", "#", ".", ".", ".", "#", "#"],
        [".", ".", ".", ".", "#", ".", ".", ".", "#", "."],
        [".", ".", "#", "#", "#", ".", ".", ".", "#", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", "#", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", "#", "."],
        ["#", "#", "#", "#", "#", "#", "#", "#", "#", "."],
      ]);

      expect(range).toStrictEqual({
        max: { x: 503, y: 9 },
        min: { x: 494, y: 4 },
      });
    });
  });
  describe("solution", () => {
    const solution = solve("test/input.txt");

    test("part 1 should return correct test score", () => {
      const expectedScore = 24;

      expect(solution[0]).toEqual(expectedScore);
    });

    test("part 2 should return correct test score", () => {
      const expectedScore = 93;

      expect(solution[1]).toEqual(expectedScore);
    });
  });
});
