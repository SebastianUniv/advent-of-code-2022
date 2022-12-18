import path from "path";
import fs from "fs";

export type Coordinate = { x: number; y: number };
type Path = Coordinate[];

export type Range = {
  min: Coordinate;
  max: Coordinate;
};

function _lineToShape(line: string): Path {
  return line.split(" -> ").map((path) => {
    const [x, y] = path.split(",").map((el) => +el);
    return { x, y };
  });
}

function _rangePath(path: Path): Range {
  return path.reduce(
    (prev, { x, y }) => {
      const { x: minX, y: minY } = prev.min;
      const { x: maxX, y: maxY } = prev.max;

      return {
        min: { x: minX < x ? minX : x, y: minY < y ? minY : y },
        max: { x: maxX > x ? maxX : x, y: maxY > y ? maxY : y },
      };
    },
    {
      min: { x: Infinity, y: Infinity },
      max: { x: 0, y: 0 },
    }
  );
}

function _rangeShape(shapes: Path[]): Range {
  return shapes.reduce(
    (prev, path) => {
      const { x: minX, y: minY } = prev.min;
      const { x: maxX, y: maxY } = prev.max;

      const found = _rangePath(path);
      const { x: pminX, y: pminY } = found.min;
      const { x: pmaxX, y: pmaxY } = found.max;

      return {
        min: { x: minX < pminX ? minX : pminX, y: minY < pminY ? minY : pminY },
        max: { x: maxX > pmaxX ? maxX : pmaxX, y: maxY > pmaxY ? maxY : pmaxY },
      };
    },
    {
      min: { x: Infinity, y: Infinity },
      max: { x: 0, y: 0 },
    }
  );
}

function _drawPath(direction: number, fn: (index: number) => void) {
  const sign = direction > 0 ? 1 : -1;

  Array(Math.abs(direction) + 1)
    .fill(sign)
    .map((x, y) => x + (y - 1) * sign)
    .forEach((index: number) => {
      fn(index);
    });
}

function _fillMapWithShapes(
  map: string[][],
  shapes: Path[],
  columnOffset: number
) {
  shapes.forEach((shape) => {
    shape.reduce((prev, current) => {
      const horizontal = current.x - prev.x;
      const vertical = current.y - prev.y;

      if (horizontal === 0) {
        _drawPath(vertical, (index: number) => {
          map[index + prev.y][prev.x - columnOffset] = "#";
        });
      }

      if (vertical === 0) {
        _drawPath(horizontal, (index: number) => {
          map[prev.y][index + prev.x - columnOffset] = "#";
        });
      }

      return current;
    });
  });

  return map;
}

export function createMapOfSize(rows: number, columns: number): string[][] {
  return Array(rows)
    .fill(null)
    .map(() => {
      return Array(columns).fill(".");
    });
}

export function parseInput(filePath: string): [string[][], Range] {
  const data = fs.readFileSync(path.join(__dirname, `./${filePath}`), "utf-8");

  const shapes = data.split(/\r?\n/).map(_lineToShape);
  const range = _rangeShape(shapes);

  const rows = range.max.y - 0 + 1;
  const columns = range.max.x - range.min.x + 1;

  return [
    _fillMapWithShapes(createMapOfSize(rows, columns), shapes, range.min.x),
    range,
  ];
}
