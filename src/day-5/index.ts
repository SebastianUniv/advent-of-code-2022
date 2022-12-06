import { Move, parseInput, Stack } from "./data/parse";

function _moveCrates(
  stacks: Stack[],
  moves: Move[],
  fn: (stack: Stack) => Stack
) {
  moves.forEach((move) => {
    const [amount, from, to] = move;
    stacks[to - 1].push(...fn(stacks[from - 1].splice(-amount)));
  });

  return stacks
    .map((stack) => stack[stack.length - 1])
    .reduce((prev, curr) => prev + curr);
}

function _partOne(args: [Stack[], Move[]]) {
  return _moveCrates(...args, (stack) => stack.reverse());
}

function _partTwo(args: [Stack[], Move[]]) {
  return _moveCrates(...args, (stack) => stack);
}

export function solve(filePath: string = "input.txt") {
  return [_partOne(parseInput(filePath)), _partTwo(parseInput(filePath))];
}
