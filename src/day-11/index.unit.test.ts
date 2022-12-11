import { parseInput } from "./data/parse";
import { solve } from ".";

describe("day 11", () => {
  describe("data", () => {
    test("data should be correctly parsed", () => {
      const monkeys = parseInput("test/input.txt");

      expect(monkeys).toStrictEqual([
        {
          items: [79, 98],
          inspect: expect.any(Function),
          divisor: 23,
          action: new Map([
            [true, 2],
            [false, 3],
          ]),
        },
        {
          items: [54, 65, 75, 74],
          inspect: expect.any(Function),
          divisor: 19,
          action: new Map([
            [true, 2],
            [false, 0],
          ]),
        },
        {
          items: [79, 60, 97],
          inspect: expect.any(Function),
          divisor: 13,
          action: new Map([
            [true, 1],
            [false, 3],
          ]),
        },
        {
          items: [74],
          inspect: expect.any(Function),
          divisor: 17,
          action: new Map([
            [true, 0],
            [false, 1],
          ]),
        },
      ]);
    });
  });
  describe("solution", () => {
    const solution = solve("test/input.txt");

    test("part 1 should return correct test score", () => {
      const expectedScore = 10605;

      expect(solution[0]).toEqual(expectedScore);
    });

    test("part 2 should return correct test score", () => {
      const expectedScore = 2713310158;

      expect(solution[1]).toEqual(expectedScore);
    });
  });
});
