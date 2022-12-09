import { parseInput } from "./data/parse";
import { solve } from ".";

describe("day 9", () => {
  describe("data", () => {
    test("data should be correctly parsed", () => {
      const moves = parseInput("test/input.txt");

      expect(moves.length).toStrictEqual(8);
    });
  });
  describe("solution", () => {
    const solution = solve("test/input.txt");

    test("part 1 should return correct test score", () => {
      const expectedScore = 88;

      expect(solution[0]).toEqual(expectedScore);
    });

    test("part 2 should return correct test score", () => {
      const expectedScore = 36;

      expect(solution[1]).toEqual(expectedScore);
    });
  });
});
