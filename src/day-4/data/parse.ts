import path from "path";
import fs from "fs";

type Range = [start: number, end: number];
export type RangePair = [first: Range, second: Range];

function _lineToRangePair(line: string): RangePair {
  return line.split(",").map((range) => {
    return range.split("-").map((char) => +char) as unknown as [Range, Range];
  }) as unknown as RangePair;
}

export function parseInput(filePath: string) {
  const rangePairs: RangePair[] = [];
  const data = fs.readFileSync(path.join(__dirname, `./${filePath}`), "utf-8");

  const lines = data.split(/\r?\n/);

  lines.forEach((line) => {
    rangePairs.push(_lineToRangePair(line));
  });

  return rangePairs;
}
