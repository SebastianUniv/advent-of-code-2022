import { Elf, parseInput } from "./data/parse";

function _elvesToDescendingTotalCalories(elves: Elf[]): number[] {
  const elvesByCalorieAmount = elves.map((elf) => {
    return elf.reduce((prev, current) => {
      return prev + current;
    });
  });

  return elvesByCalorieAmount.sort((a, b) => b - a);
}

function _partOne(elves: Elf[]) {
  return _elvesToDescendingTotalCalories(elves)[0];
}

function _partTwo(elves: Elf[]) {
  return _elvesToDescendingTotalCalories(elves)
    .slice(0, 3)
    .reduce((prev, current) => {
      return prev + current;
    });
}

export function solve(filePath: string = "input.txt") {
  const elves = parseInput(filePath);

  return [_partOne(elves), _partTwo(elves)];
}
