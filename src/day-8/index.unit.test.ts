import { parseInput } from "./data/parse";
import { solve } from ".";

describe("day 8", () => {
  describe("data", () => {
    test("data should be correctly parsed", () => {
      const forest = parseInput("test/input.txt");

      expect(forest.length).toStrictEqual(5);
    });
  });
  describe("solution", () => {
    const solution = solve("test/input.txt");

    test("part 1 should return correct test score", () => {
      const expectedScore = 21;

      expect(solution[0]).toEqual(expectedScore);
    });

    test("part 2 should return correct test score", () => {
      const expectedScore = 8;

      expect(solution[1]).toEqual(expectedScore);
    });
  });
});
