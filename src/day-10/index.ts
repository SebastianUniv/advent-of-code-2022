import { Instruction, Command, parseInput } from "./data/parse";

function _signalStrength(cycle: number, register: number) {
  if ((cycle - 20) % 40 === 0 || cycle - 20 === 0) {
    return cycle * register;
  }
  return 0;
}

function _partOne(commands: Command[]): number {
  let cycle = 0;
  let register = 1;
  let totalSignalStrength = 0;

  for (const [instruction, value] of commands) {
    switch (instruction) {
      case Instruction.addx:
        cycle++; // first cycle
        totalSignalStrength += _signalStrength(cycle, register); // check first cycle
        cycle++; // second cycle
        totalSignalStrength += _signalStrength(cycle, register); // check second cycle
        register += value!; // add value at end of second cycle, start of next instruction
        break;
      case Instruction.noop:
        cycle += 1;
        totalSignalStrength += _signalStrength(cycle, register);
        break;
    }
  }
  return totalSignalStrength;
}

function _printCRT(sprites: number[] = []) {
  const width = 40;
  const height = 6;
  let crt: string[] = Array(width * height).fill(".");

  sprites.forEach((sprite) => {
    crt[sprite - 1] = "#";
  });

  let display: string = "\n";

  for (let i = 0; i < width * height; i += width) {
    const row = crt.slice(i, i + width);
    display += row.join("") + "\n";
  }

  return display;
}

function _mutateSprites(
  spritePositions: number[],
  cycle: number,
  register: number
) {
  const spriteLocation = [register - 1, register, register + 1];
  if (spriteLocation.includes((cycle % 40) - 1)) {
    spritePositions.push(cycle);
  }
  return spritePositions;
}

function _partTwo(commands: Command[]): string {
  let cycle = 0;
  let register = 1;
  let spritePositions: number[] = [];

  spritePositions = _mutateSprites(spritePositions, cycle, register);

  for (const [instruction, value] of commands) {
    switch (instruction) {
      case Instruction.addx:
        cycle++; // first cycle
        spritePositions = _mutateSprites(spritePositions, cycle, register);
        cycle++; // second cycle
        spritePositions = _mutateSprites(spritePositions, cycle, register);
        register += value!; // add value at end of second cycle, start of next instruction
        break;
      case Instruction.noop:
        cycle += 1;
        _mutateSprites(spritePositions, cycle, register);
        break;
    }
  }

  return _printCRT(spritePositions);
}

export function solve(filePath: string = "input.txt"): [number, string] {
  const commands = parseInput(filePath);

  return [_partOne(commands), _partTwo(commands)];
}
