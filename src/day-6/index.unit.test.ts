import { parseInput } from "./data/parse";
import { solve } from ".";

describe("day 6", () => {
  describe("data", () => {
    test("data should be correctly parsed", () => {
      const buffer = parseInput("test/input.txt");

      expect(buffer.length).toStrictEqual(30);
    });
  });
  describe("solution", () => {
    const solution = solve("test/input.txt");

    test("part 1 should return correct test score", () => {
      const expectedScore = 7;

      expect(solution[0]).toEqual(expectedScore);
    });

    test("part 2 should return correct test score", () => {
      const expectedScore = 19;

      expect(solution[1]).toEqual(expectedScore);
    });
  });
});
