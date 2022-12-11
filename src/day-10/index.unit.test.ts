import { parseInput } from "./data/parse";
import { solve } from ".";

describe("day 10", () => {
  describe("data", () => {
    test("data should be correctly parsed", () => {
      const commands = parseInput("test/input.txt");

      expect(commands.length).toStrictEqual(146);
    });
  });
  describe("solution", () => {
    const solution = solve("test/input.txt");

    test("part 1 should return correct test score", () => {
      const expectedScore = 13140;

      expect(solution[0]).toEqual(expectedScore);
    });

    test("part 2 should return correct test score", () => {
      const expectedScore = `
##..##..##..##..##..##..##..##..##..##..
###...###...###...###...###...###...###.
####....####....####....####....####....
#####.....#####.....#####.....#####.....
######......######......######......###.
#######.......#######.......#######.....
      `;

      expect(solution[1].trim()).toEqual(expectedScore.trim());
    });
  });
});
