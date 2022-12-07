import { Directory, parseInput } from "./data/parse";

function _calcSize(candidate: Directory, fn?: any): number {
  const { directories, files } = candidate;

  const filesSize = files.reduce((prev, [_, size]) => prev + size, 0);
  const dirsSize = Object.keys(directories).reduce((prev, current) => {
    return prev + _calcSize(directories[current], fn);
  }, 0);

  fn && fn(filesSize + dirsSize);

  return filesSize + dirsSize;
}

function _calcSumOfTargetDirectories(fileDirectory: Directory, target: number) {
  let sumDirectories = 0;

  _calcSize(fileDirectory, (size: number) => {
    if (size <= target) {
      sumDirectories += size;
    }
  });

  return sumDirectories;
}

function _partOne(fileDirectory: Directory) {
  const target = 100000;

  return _calcSumOfTargetDirectories(fileDirectory, target);
}

function _calcSmallestRemovalSize(fileDirectory: Directory, target: number) {
  let removalSize = Infinity;

  _calcSize(fileDirectory, (size: number) => {
    if (size >= target && size < removalSize) {
      removalSize = size;
    }
  });

  return removalSize;
}

function _partTwo(fileDirectory: Directory) {
  const target = 30000000 - (70000000 - _calcSize(fileDirectory));

  return _calcSmallestRemovalSize(fileDirectory, target);
}

export function solve(filePath: string = "input.txt") {
  const fileDirectory = parseInput(filePath);

  return [_partOne(fileDirectory), _partTwo(fileDirectory)];
}
