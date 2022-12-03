import path from "path";
import fs from "fs";

type Compartment = number[];
export type BackPack = [Compartment, Compartment];

function _stringToPriority(char: string): number {
  let asciiValue = char.charCodeAt(0);

  if (asciiValue > 90) {
    return asciiValue - 96;
  } else {
    return asciiValue - 38;
  }
}

export function parseInput(filePath: string) {
  let backpacks: BackPack[] = [];
  const data = fs.readFileSync(path.join(__dirname, `./${filePath}`), "utf-8");

  const lines = data.split(/\r?\n/);

  lines.forEach((line) => {
    const backpack = line.split("").map(_stringToPriority);
    const first = backpack.splice(0, backpack.length / 2);
    const second = backpack;
    backpacks.push([first, second]);
  });

  return backpacks;
}
