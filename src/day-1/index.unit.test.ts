import { parseInput } from "./data/parse";
import { solve } from ".";

describe("day 4", () => {
  describe("data", () => {
    test("data should be correclt parsed", () => {
      const elves = parseInput("test/input.txt");

      expect(elves.length).toEqual(5);
    });
  });
  describe("solution", () => {
    test("part 1 should return correct test score", () => {
      const expectedScore = 24000;

      expect(solve("test/input.txt")[0]).toEqual(expectedScore);
    });

    test("part 2 should return correct test score", () => {
      const expectedScore = 45000;

      expect(solve("test/input.txt")[1]).toEqual(expectedScore);
    });
  });
});
