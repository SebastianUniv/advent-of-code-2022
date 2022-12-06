import { parseInput } from "./data/parse";

function _getCharCountUntilSetOfSize(buffer: string[], size: number): number {
  const uniqueChars = new Set(buffer.slice(0, size));

  if (uniqueChars.size < size) {
    return (
      1 + _getCharCountUntilSetOfSize(buffer.splice(1, buffer.length), size)
    );
  }

  return size;
}

function _partOne(buffer: string[]): number {
  return _getCharCountUntilSetOfSize(buffer, 4);
}

function _partTwo(buffer: string[]): number {
  return _getCharCountUntilSetOfSize(buffer, 14);
}

export function solve(filePath: string = "input.txt") {
  return [_partOne(parseInput(filePath)), _partTwo(parseInput(filePath))];
}
