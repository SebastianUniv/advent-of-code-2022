import { BackPack, parseInput } from "./data/parse";

function _backpackToDuplicateSet(backpack: BackPack) {
  return new Set(backpack[0].filter((item) => backpack[1].includes(item)));
}

function _duplicateSetToPriorityByBackpack(duplicateSet: Set<number>) {
  return Array.from(duplicateSet).reduce((prev, current) => prev + current);
}

function _partOne(backpacks: BackPack[]) {
  let duplicateSets: Set<number>[] = backpacks.map(_backpackToDuplicateSet);

  return duplicateSets
    .map(_duplicateSetToPriorityByBackpack)
    .reduce((prev, current) => prev + current);
}

function _filterDuplicateItems(backpack: BackPack) {
  return [...new Set([...backpack[0], ...backpack[1]])];
}

function _findItemInGroup(backpackSets: number[][]) {
  let filtered = [];

  for (let i = 0; i <= backpackSets.length - 3; i = i + 3) {
    filtered.push(
      backpackSets[i].filter(
        (item) =>
          backpackSets[i + 1].includes(item) &&
          backpackSets[i + 2].includes(item)
      )[0]
    );
  }

  return filtered;
}

function _partTwo(backpacks: BackPack[]) {
  const itemSetByBackpack = backpacks.map(_filterDuplicateItems);

  return _findItemInGroup(itemSetByBackpack).reduce(
    (prev, current) => prev + current
  );
}

export function solve(filePath: string = "input.txt") {
  const backpacks = parseInput(filePath);

  return [_partOne(backpacks), _partTwo(backpacks)];
}
