import path from "path";
import fs from "fs";

export enum Instruction {
  noop = "noop",
  addx = "addx",
}
export type Command = [instruction: Instruction, value?: number];

export function parseInput(filePath: string) {
  const instructions: Command[] = [];
  const data = fs.readFileSync(path.join(__dirname, `./${filePath}`), "utf-8");

  const lines = data.split(/\r?\n/);

  lines.forEach((line) => {
    const [instruction, value] = line.split(" ");
    instructions.push([instruction as Instruction, +value]);
  });

  return instructions;
}
