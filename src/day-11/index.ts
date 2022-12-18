import { Monkey, parseInput } from "./data/parse";

function _runMonkeyGame(
  monkeys: Monkey[],
  rounds: number,
  reduceWorry: (worry: number) => number
) {
  const inspectionsByMonkey: number[] = Array(monkeys.length).fill(0);

  for (let round = 0; round < rounds; round++) {
    monkeys.forEach((monkey, index) => {
      monkey.items.forEach((item) => {
        const worry = reduceWorry(monkey.inspect(item));

        inspectionsByMonkey[index] += 1;

        const to = monkey.action.get(worry % monkey.divisor === 0)!;
        monkeys[to].items.push(worry);
      });

      monkey.items = [];
    });
  }

  return inspectionsByMonkey
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((prev, current) => prev * current);
}

function _partOne(monkeys: Monkey[]) {
  return _runMonkeyGame(monkeys, 20, (worry: number) => {
    return Math.floor(worry / 3);
  });
}

function _partTwo(monkeys: Monkey[]) {
  // FIXME: Should actually be LCM
  const divisorProduct = monkeys.reduce(
    (product, monkey) => product * monkey.divisor,
    1
  );

  return _runMonkeyGame(monkeys, 10000, (worry: number) => {
    return worry % divisorProduct;
  });
}

export function solve(filePath: string = "input.txt") {
  return [_partOne(parseInput(filePath)), _partTwo(parseInput(filePath))];
}
