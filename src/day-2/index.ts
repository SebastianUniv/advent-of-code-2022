import { Move, parseInput, Strategy } from "./data/parse";

function _getOutcome(round: (Move | Strategy)[]) {
  const [opponent, player] = round;
  let result: number;

  switch (opponent - player) {
    case -1:
    case 2:
      result = 6;
      break;
    case 0:
      result = 3;
      break;
    default:
      result = 0;
  }

  return result + player;
}

function _partOne(rounds: (Move | Strategy)[][]): number {
  return rounds
    .map((round) => _getOutcome(round))
    .reduce((prevScore, currScore) => prevScore + currScore);
}

function _findOutcome(round: (Move | Strategy)[]) {
  const [opponent, player] = round;
  let result: number;

  switch (player) {
    case Strategy.Win:
      result = opponent + 1 === 4 ? 1 : opponent + 1;
      result = result + 6;
      break;
    case Strategy.Draw:
      result = opponent + 3;
      break;
    case Strategy.Lose:
      result = opponent - 1 === 0 ? 3 : opponent - 1;
      break;
  }

  return result!;
}

function _partTwo(rounds: (Move | Strategy)[][]) {
  return rounds
    .map((round) => _findOutcome(round))
    .reduce((prevScore, currScore) => prevScore + currScore);
}

export function solve(filePath: string = "input.txt") {
  return [
    _partOne(parseInput(filePath, Move)),
    _partTwo(parseInput(filePath, Strategy)),
  ];
}
