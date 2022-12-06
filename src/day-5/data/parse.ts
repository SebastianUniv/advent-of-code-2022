import path from "path";
import fs from "fs";

export type Stack = string[];
export type Move = [amount: number, from: number, to: number];

export function parseInput(filePath: string): [Stack[], Move[]] {
  const data = fs.readFileSync(path.join(__dirname, `./${filePath}`), "utf-8");

  const [crates, moves] = data.split(/\n\n/);

  const cratesByLine = crates.split(/\r?\n/);
  const stackLine = cratesByLine
    .pop()
    ?.split("")
    .filter((char) => char != " ")
    .map((char) => +char)
    .reduce((currentMax, currentValue) =>
      currentMax > currentValue ? currentMax : currentValue
    );

  const crateLines = cratesByLine.reduceRight((cratesByStack, line) => {
    const parsedLine = line.split("").reduce((prev, current, index) => {
      const isCrateTypeIndex = index == 1 || (index - 1) % 4 == 0;
      const hasCrate = current !== " ";

      if (!hasCrate || !isCrateTypeIndex) {
        return prev;
      }

      const stackIndex = Math.floor(index / 4);

      return [...prev, [current, stackIndex]] as [string, number][];
    }, [] as [string, number][]);

    parsedLine.forEach(([crate, index]) => {
      cratesByStack[index].push(crate);
    });

    return cratesByStack;
  }, [...Array(stackLine)].map(() => []) as string[][]);

  const moveLines: Move[] = moves.split(/\r?\n/).map((moveLine) => {
    return moveLine
      .split(" ")
      .filter((char) => +char)
      .map((char) => +char) as Move;
  });

  return [crateLines, moveLines];
}
