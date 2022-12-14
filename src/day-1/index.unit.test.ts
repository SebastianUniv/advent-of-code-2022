import { parseInput } from "./data/parse";
import { solve } from ".";

describe("day 1", () => {
  describe("data", () => {
    test("data should be correctly parsed", () => {
      const elves = parseInput("test/input.txt");

      expect(elves.length).toEqual(5);
    });
  });
  describe("solution", () => {
    const solution = solve("test/input.txt");

    test("part 1 should return correct test score", () => {
      const expectedScore = 24000;

      expect(solution[0]).toEqual(expectedScore);
    });

    test("part 2 should return correct test score", () => {
      const expectedScore = 45000;

      expect(solution[1]).toEqual(expectedScore);
    });
  });
});
