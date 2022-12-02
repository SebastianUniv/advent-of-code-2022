import path from "path";
import fs from "fs";

export enum Move {
  Rock = 1,
  Paper = 2,
  Scissors = 3,
}

export enum Strategy {
  Win,
  Draw,
  Lose,
}

const opponentToMove: Map<string, Move> = new Map([
  ["A", Move.Rock],
  ["B", Move.Paper],
  ["C", Move.Scissors],
]);

const playerToMove: Map<string, Move> = new Map([
  ["X", Move.Rock],
  ["Y", Move.Paper],
  ["Z", Move.Scissors],
]);

const playerToStrategy: Map<string, Strategy> = new Map([
  ["X", Strategy.Lose],
  ["Y", Strategy.Draw],
  ["Z", Strategy.Win],
]);

export function parseInput(
  filePath: string,
  mapping: typeof Move | typeof Strategy
) {
  const rounds: (Move | Strategy)[][] = [];
  const data = fs.readFileSync(path.join(__dirname, `./${filePath}`), "utf-8");

  const lines = data.split(/\r?\n/);

  const map = new Map<string, Move | Strategy>([
    ...opponentToMove,
    ...(mapping === Move ? playerToMove : playerToStrategy),
  ]);

  lines.forEach((line) => {
    const round = line.split("").filter((char) => char !== " ");
    rounds.push(round.map((move) => map.get(move)!));
  });

  return rounds;
}
