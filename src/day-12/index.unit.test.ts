import { parseInput } from "./data/parse";
import { solve } from ".";

describe("day 12", () => {
  describe("data", () => {
    test("data should be correctly parsed", () => {
      const [map, start, end] = parseInput("test/input.txt");

      expect(map.length).toStrictEqual(5);
      expect(map[0].length).toStrictEqual(8);

      expect(start).toStrictEqual([0, 0]);
      expect(end).toStrictEqual([5, 2]);
    });
  });
  describe("solution", () => {
    const solution = solve("test/input.txt");

    test("part 1 should return correct test score", () => {
      const expectedScore = 31;

      expect(solution[0]).toEqual(expectedScore);
    });

    test("part 2 should return correct test score", () => {
      const expectedScore = 29;

      expect(solution[1]).toEqual(expectedScore);
    });
  });
});
