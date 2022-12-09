import path from "path";
import fs from "fs";

export enum Direction {
  UP = "U",
  DOWN = "D",
  LEFT = "L",
  RIGHT = "R",
}

export type Move = [direction: Direction, count: number];

export function parseInput(filePath: string) {
  const moves: Move[] = [];
  const data = fs.readFileSync(path.join(__dirname, `./${filePath}`), "utf-8");

  const lines = data.split(/\r?\n/);

  lines.forEach((line) => {
    const [direction, count] = line.split(" ") as Move;
    moves.push([direction, +count]);
  });

  return moves;
}
