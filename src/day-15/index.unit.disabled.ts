import { parseInput } from "./data/parse";
import { solve } from ".";

describe("day 15", () => {
  describe("data", () => {
    test("data should be correctly parsed", () => {
      const pairs = parseInput("test/input.txt");

      expect(pairs.length).toStrictEqual(14);
      expect(pairs[0].length).toStrictEqual(2);
    });
  });
  describe("solution", () => {
    const solution = solve("test/input.txt", 10, 20);

    test("part 1 should return correct test score", () => {
      const expectedScore = 26;

      expect(solution[0]).toEqual(expectedScore);
    });

    test("part 2 should return correct test score", () => {
      const expectedScore = 56000011;

      expect(solution[1]).toEqual(expectedScore);
    });
  });
});
