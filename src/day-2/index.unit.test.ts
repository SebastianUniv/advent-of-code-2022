import { Move, parseInput, Strategy } from "./data/parse";
import { solve } from ".";

describe("day 4", () => {
  describe("data", () => {
    test("part 1 data should be correctly parsed", () => {
      const rounds = parseInput("test/input.txt", Move);

      expect(rounds).toStrictEqual([
        [Move.Rock, Move.Paper],
        [Move.Paper, Move.Rock],
        [Move.Scissors, Move.Scissors],
      ]);
    });

    test("part 2 data should be correctly parsed", () => {
      const rounds = parseInput("test/input.txt", Strategy);

      expect(rounds).toStrictEqual([
        [Move.Rock, Strategy.Draw],
        [Move.Paper, Strategy.Win],
        [Move.Scissors, Strategy.Lose],
      ]);
    });
  });
  describe("solution", () => {
    test("part 1 should return correct test score", () => {
      const expectedScore = 15;

      expect(solve("test/input.txt")[0]).toEqual(expectedScore);
    });

    test("part 2 should return correct test score", () => {
      const expectedScore = 12;

      expect(solve("test/input.txt")[1]).toEqual(expectedScore);
    });
  });
});
