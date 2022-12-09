import path from "path";
import fs from "fs";

export function parseInput(filePath: string) {
  const forest: number[][] = [];
  const data = fs.readFileSync(path.join(__dirname, `./${filePath}`), "utf-8");

  const lines = data.split(/\r?\n/);

  lines.forEach((line) => {
    const trees = line.split("").map((tree) => +tree);
    forest.push(trees);
  });

  return forest;
}
