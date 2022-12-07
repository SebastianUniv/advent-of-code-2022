import { parseInput } from "./data/parse";
import { solve } from ".";

describe("day 7", () => {
  describe("data", () => {
    test("data should be correctly parsed", () => {
      const data = parseInput("test/input.txt");

      expect(data).toStrictEqual({
        directories: {
          a: {
            directories: {
              e: { directories: {}, filesSize: 584 },
            },
            filesSize: 94269,
          },
          d: {
            directories: {},
            filesSize: 24933642,
          },
        },
        filesSize: 23352670,
      });
    });
  });
  describe("solution", () => {
    const solution = solve("test/input.txt");

    test("part 1 should return correct test score", () => {
      const expectedScore = 95437;

      expect(solution[0]).toEqual(expectedScore);
    });

    test("part 2 should return correct test score", () => {
      const expectedScore = 24933642;

      expect(solution[1]).toEqual(expectedScore);
    });
  });
});
