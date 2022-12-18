import path from "path";
import fs from "fs";

export type Coordinate = [x: number, y: number];

export function parseInput(
  filePath: string
): [number[][], Coordinate, Coordinate] {
  const map: number[][] = [];
  let start: Coordinate = [0, 0];
  let end: Coordinate = [0, 0];
  const data = fs.readFileSync(path.join(__dirname, `./${filePath}`), "utf-8");

  const lines = data.split(/\r?\n/);

  lines.forEach((line, rowIndex: number) => {
    map.push(
      line.split("").map((char: string, colIndex: number) => {
        let priority = char.charCodeAt(0);
        // Capital S
        if (priority === 83) {
          start = [colIndex, rowIndex];
          return "a".charCodeAt(0);
        }
        // Capital E
        if (priority === 69) {
          end = [colIndex, rowIndex];
          return "z".charCodeAt(0);
        }
        return priority;
      })
    );
  });
  // start = [x,y], end = [x, y], map[y][x] = Coordinate

  return [map, start, end];
}
