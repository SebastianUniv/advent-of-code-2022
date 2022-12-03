import path from "path";
import fs from "fs";

export type Elf = number[];

export function parseInput(filePath: string) {
  let elves: Elf[] = [];
  const data = fs.readFileSync(path.join(__dirname, `./${filePath}`), "utf-8");

  const lines = data.split(/\r?\n/);
  let elf: Elf = [];

  lines.forEach((line) => {
    if (!line) {
      elves.push(elf);
      elf = [];
      return;
    }
    elf.push(+line);
  });

  if (elf.length > 0) {
    elves.push(elf);
  }

  return elves;
}
