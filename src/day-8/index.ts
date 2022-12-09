import { parseInput } from "./data/parse";

function _calcScoreByFn<T>(
  forest: number[][],
  fn: (current: number, treeLine: number[]) => T,
  score: (left: T, right: T, up: T, down: T) => void,
  offset: number = 0
) {
  for (let row = 0 + offset; row < forest.length - offset; ++row) {
    for (
      let column = 0 + offset;
      column < forest[row].length - offset;
      ++column
    ) {
      const horizontal = forest[row];
      const vertical = forest.map((treeline) => treeline[column]);
      const current = forest[row][column];

      const left = fn(current, horizontal.slice(0, column).reverse());
      const right = fn(current, horizontal.slice(column + 1));

      const up = fn(current, vertical.slice(0, row).reverse());
      const down = fn(current, vertical.slice(row + 1));

      score(left, right, up, down);
    }
  }
}

function _isTreeVisible(current: number, treeLine: number[]) {
  return treeLine.every((tree) => tree < current);
}

function _partOne(forest: number[][]) {
  let visibleTrees: number = 0;

  _calcScoreByFn(
    forest,
    _isTreeVisible,
    (left, right, up, down) => {
      if (left || right || up || down) {
        visibleTrees += 1;
      }
    },
    1
  );

  return visibleTrees + 2 * forest.length + 2 * forest[0].length - 4;
}

function _calcDirectionScore(current: number, treeLine: number[]) {
  let score = 0;

  for (const tree of treeLine) {
    score++;
    if (tree >= current) {
      break;
    }
  }

  return score;
}

function _partTwo(forest: number[][]) {
  let treeScores: number[] = [];

  _calcScoreByFn(forest, _calcDirectionScore, (left, right, up, down) => {
    treeScores.push(left * right * up * down);
  });

  return treeScores.reduce((prev, score) => (prev < score ? score : prev));
}

export function solve(filePath: string = "input.txt") {
  const forest = parseInput(filePath);

  return [_partOne(forest), _partTwo(forest)];
}
