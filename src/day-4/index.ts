import { parseInput, RangePair } from "./data/parse";

function _partOne(rangePairs: RangePair[]) {
  const containedPairs = rangePairs.filter(([first, second]) => {
    const secondInFirst = first[0] <= second[0] && first[1] >= second[1];
    const firstInSecond = first[0] >= second[0] && first[1] <= second[1];

    return secondInFirst || firstInSecond;
  });

  return containedPairs.length;
}

function _partTwo(rangePairs: RangePair[]) {
  const overlappingPairs = rangePairs.filter(([first, second]) => {
    const firstEndInSecond = first[1] >= second[0] && first[1] <= second[1];
    const secondEndInFirst = second[1] >= first[0] && second[1] <= first[1];

    return firstEndInSecond || secondEndInFirst;
  });

  return overlappingPairs.length;
}

export function solve(filePath: string = "input.txt") {
  const rangePairs = parseInput(filePath);

  return [_partOne(rangePairs), _partTwo(rangePairs)];
}
