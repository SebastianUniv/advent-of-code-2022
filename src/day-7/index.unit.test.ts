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
              e: { directories: {}, files: [["i", 584]], size: 0 },
            },
            files: [
              ["f", 29116],
              ["g", 2557],
              ["h.lst", 62596],
            ],
            size: 0,
          },
          d: {
            directories: {},
            files: [
              ["j", 4060174],
              ["d.log", 8033020],
              ["d.ext", 5626152],
              ["k", 7214296],
            ],
            size: 0,
          },
        },
        files: [
          ["b.txt", 14848514],
          ["c.dat", 8504156],
        ],
        size: 0,
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
