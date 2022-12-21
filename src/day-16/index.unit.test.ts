import { parseInput } from "./data/parse";
import { solve } from ".";

describe("day 16", () => {
  describe("data", () => {
    test("data should be correctly parsed", () => {
      const graph = parseInput("test/input.txt");
    });
  });
  describe("solution", () => {
    const solution = solve("test/input.txt");

    test("part 1 should return correct test score", () => {
      const expectedScore = 0;

      expect(solution[0]).toEqual(expectedScore);
    });

    test("part 2 should return correct test score", () => {
      const expectedScore = 0;

      expect(solution[1]).toEqual(expectedScore);
    });
  });
});
