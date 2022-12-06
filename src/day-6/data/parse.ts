import path from "path";
import fs from "fs";

export function parseInput(filePath: string) {
  const buffer: string[] = [];
  const data = fs.readFileSync(path.join(__dirname, `./${filePath}`), "utf-8");

  const lines = data.split(/\r?\n/);

  lines.forEach((line) => {
    buffer.push(...line.split(""));
  });

  return buffer;
}
