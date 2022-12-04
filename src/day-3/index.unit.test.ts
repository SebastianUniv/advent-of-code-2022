import { parseInput } from "./data/parse";
import { solve } from ".";

describe("day 3", () => {
  describe("data", () => {
    test("data should be correctly parsed", () => {
      const backpacks = parseInput("test/input.txt");

      expect(backpacks.length).toStrictEqual(6);
      expect(backpacks[0][0].length).toStrictEqual(12);
      expect(backpacks[backpacks.length - 1][0].length).toStrictEqual(12);
    });
  });
  describe("solution", () => {
    const solution = solve("test/input.txt");

    test("part 1 should return correct test score", () => {
      const expectedScore = 157;

      expect(solution[0]).toEqual(expectedScore);
    });

    test("part 2 should return correct test score", () => {
      const expectedScore = 70;

      expect(solution[1]).toEqual(expectedScore);
    });
  });
});
