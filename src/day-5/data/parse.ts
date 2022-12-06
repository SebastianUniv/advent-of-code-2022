import path from "path";
import fs from "fs";

export type Stack = string[];
export type Move = [amount: number, from: number, to: number];

function _stackLineToStackCount(stackLine: string): number {
  return stackLine
    .split("")
    .filter((char) => char != " ")
    .map((char) => +char)
    .reduce((currentMax, currentValue) =>
      currentMax > currentValue ? currentMax : currentValue
    );
}

function _lineToCrateByStacks(line: string) {
  return line.split("").reduce((prev, current, index) => {
    const isCrateTypeIndex = index == 1 || (index - 1) % 4 == 0;
    const hasCrate = current !== " ";

    if (!hasCrate || !isCrateTypeIndex) {
      return prev;
    }

    const stackIndex = Math.floor(index / 4);

    return [...prev, [current, stackIndex]] as [string, number][];
  }, [] as [string, number][]);
}

function _crateLinesToStacks(
  crateLines: string[],
  stackCount: number
): Stack[] {
  return crateLines.reduceRight<Stack[]>(
    (cratesByStacks, line) => {
      const crateByStacks = _lineToCrateByStacks(line);

      crateByStacks.forEach(([crate, index]) => {
        cratesByStacks[index].push(crate);
      });

      return cratesByStacks;
    },
    [...Array(stackCount)].map(() => [])
  );
}

function _moveLinesToMoves(moveLines: string[]): Move[] {
  return moveLines.map((moveLine) => {
    return moveLine
      .split(" ")
      .filter((char) => +char)
      .map((char) => +char) as Move;
  });
}

export function parseInput(filePath: string): [Stack[], Move[]] {
  const data = fs.readFileSync(path.join(__dirname, `./${filePath}`), "utf-8");

  const [crates, moves] = data.split(/\n\n/);
  const crateLines = crates.split(/\r?\n/);

  const stackCount = _stackLineToStackCount(crateLines.pop()!);

  const moveLines = moves.split(/\r?\n/);

  return [
    _crateLinesToStacks(crateLines, stackCount),
    _moveLinesToMoves(moveLines),
  ];
}
