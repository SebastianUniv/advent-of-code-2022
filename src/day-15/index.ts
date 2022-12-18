import { Pair, parseInput, Coordinate } from "./data/parse";

type Range = [number, number];

function _manhattan(start: Coordinate, dest: Coordinate) {
  const [sx, sy] = start;
  const [dx, dy] = dest;
  return Math.abs(sx - dx) + Math.abs(sy - dy);
}

function _findRowCoverage(
  pairs: Pair[],
  row: number,
  fn: (ranges: Range[]) => number
) {
  const ranges: Range[] = pairs
    .reduce<Range[]>((found, [sensor, beacon]) => {
      const max = _manhattan(sensor, beacon);

      const [sx, sy] = sensor;
      const left = sx - (max - Math.abs(row - sy));
      const right = sx + (max - Math.abs(row - sy));

      if (left <= right) return [...found, [left, right]];

      return found;
    }, [])
    .sort(([l1, _r1], [l2, _r2]) => l1 - l2)
    .reduce<Range[]>((intervals, range) => {
      let last = intervals.pop();
      if (!last) last = range;

      if (last[1] + 1 >= range[0] && range[1] >= last[1]) {
        return [...intervals, [last[0], range[1]]];
      }

      if (last[1] + 1 >= range[0] && range[1] < last[1]) {
        return [...intervals, last];
      }
      return [...intervals, last, range];
    }, []);

  return fn(ranges);
}

function _partOne(pairs: Pair[], row: number) {
  return _findRowCoverage(pairs, row, (ranges) => {
    return ranges.reduce(
      (covered, [start, end]) => covered + Math.abs(start - end),
      0
    );
  });
}

function _partTwo(pairs: Pair[], range: number) {
  let score;

  for (let row = 0; row <= range; row++) {
    score = _findRowCoverage(pairs, row, (ranges) => {
      return ranges.reduce((coordinate, [start, end]) => {
        if (start <= 0 && end >= range) return 0;
        if (start > 0 && start <= range) return 4000000 * (start - 1) + row;
        return coordinate;
      }, 0);
    });

    if (score) return score;
  }

  return score;
}

export function solve(
  filePath: string = "input.txt",
  row: number = 2000000,
  range: number = 4000000
) {
  const pairs = parseInput(filePath);

  return [_partOne(pairs, row), _partTwo(pairs, range)];
}
