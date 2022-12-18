import path from "path";
import fs from "fs";

export type Coordinate = [x: number, y: number];
export type Pair = [sensor: Coordinate, beacon: Coordinate];

function _parseCoordinates(line: string): Coordinate {
  return line
    .split("x")[1]
    .split(",")
    .map((coordinate) => +coordinate.split("=")[1].trim()) as Coordinate;
}

export function parseInput(filePath: string): Pair[] {
  const data = fs.readFileSync(path.join(__dirname, `./${filePath}`), "utf-8");

  const lines = data.split(/\r?\n/);

  return lines.map((line) => {
    const [sensorLine, beaconLine] = line.split(":");
    return [_parseCoordinates(sensorLine), _parseCoordinates(beaconLine)];
  });
}
