import { parseInput, Coordinate, Range, createMapOfSize } from "./data/parse";

function _findSandPlacement(
  map: string[][],
  { x, y }: Coordinate,
  fn: (coordinate: Coordinate) => Coordinate
) {
  while (true) {
    if (map[y][x] === ".") {
      y += 1;
      continue;
    }

    if (map[y][x - 1] === ".") {
      (x -= 1), (y += 1);
      continue;
    } else if (map[y][x - 1] === undefined) {
      // build infinite map to the left
      return fn({ x: x - 1, y });
    }

    if (map[y][x + 1] === "." || undefined) {
      (x += 1), (y += 1);
      continue;
    } else if (map[y][x + 1] === undefined) {
      // build infinite map to the right
      return fn({ x: x + 1, y });
    }

    return { x, y: y - 1 };
  }
}

function _partOne(map: string[][], range: Range) {
  const source: Coordinate = { x: 500 - range.min.x, y: 0 };

  let i = 0;
  while (true) {
    let { x, y } = _findSandPlacement(map, source, () => ({ x: -1, y: -1 }));
    if (x < 0) break;
    map[y][x] = "o";
    i++;
  }

  return i;
}

function _createColumnEnd(map: string[][]) {
  map.forEach((row) => row.push("."));
  const lastRow = map[map.length - 1];
  lastRow[lastRow.length - 1] = "#";
}

function _createColumnStart(map: string[][]) {
  map.forEach((row) => row.unshift("."));
  const lastRow = map[map.length - 1];
  lastRow[0] = "#";
}

// function _findInChunks(
//   map: string[][],
//   source: Coordinate,
//   fn: any
// ): Coordinate {
//   return _findSandPlacement(map, source, ({ x, y }) => {
//     if (x >= map.length) {
//       // if right create column
//       // go further with search
//       _createColumnRight(map);
//       return _findInChunks(map, { x, y }, fn);
//     } else {
//       // if left go back to main map
//       // -> return coordinate target in main map
//       return fn({ x, y: y - 1 });
//     }
//   });
// }

// function _findInAllChunks(
//   map: string[][],
//   mapLeft: string[][],
//   mapRight: string[][]
// ) {
//   return ({ x, y }: Coordinate) => {
//     if (x >= map.length) {
//       // if right
//       return _findInChunks(
//         mapRight,
//         { x: x - map[0].length, y },
//         (coordinate: Coordinate) =>
//           _findSandPlacement(map, coordinate, ({ x, y }) =>
//             _findInAllChunks(map, mapLeft, mapRight)({ x, y })
//           )
//       );
//     } else {
//       // translate to left map
//       // make x positive, then -1 for 0 index
//       return _findInChunks(
//         mapLeft,
//         { x: -x - 1, y },
//         (coordinate: Coordinate) =>
//           _findSandPlacement(map, coordinate, ({ x, y }) =>
//             _findInAllChunks(map, mapLeft, mapRight)({ x, y })
//           )
//       );
//     }
//   };
// }

// function _findInChunks(map: string[][], source: Coordinate, fn: any): Coordinate {
//   return _findSandPlacement(map, source, ({ x, y }) => {
//     if (x >= map.length) {
//       // if right create column
//       // go further with search
//       _createColumnRight(map);
//       return _findInChunks(map, { x, y });
//     } else {
//       // if left go back to main map
//       // -> return coordinate target in main map
//       return { x, y: y - 1 };
//     }
//   });
// }
// function _findSandPlacementInChunks(
//   [left, mid, right]: string[][][],
//   source: Coordinate
// ): Coordinate {
//   return _findSandPlacement(mid, source, ({ x, y }) => {
//     if (x < 0) {
//       return _findSandPlacementInChunks([x, left, x], { x, y });
//     } else {
//       return _findSandPlacementInChunks([x, right, x], { x, y });
//     }
//   });
// }

function _findSandPlacementInfiniteMap(
  map: string[][],
  source: Coordinate
): Coordinate {
  return _findSandPlacement(map, source, ({ x, y }) => {
    if (x >= map.length) {
      _createColumnEnd(map);
      return _findSandPlacementInfiniteMap(map, { x, y });
    } else {
      _createColumnStart(map);
      return _findSandPlacementInfiniteMap(map, { x, y });
    }
  });
}

function _partTwo(map: string[][], range: Range) {
  const source: Coordinate = { x: 500 - range.min.x, y: 0 };

  map.push(Array(range.max.x - range.min.x + 1).fill("."));
  map.push(Array(range.max.x - range.min.x + 1).fill("#"));

  let i = 0;
  while (true) {
    let { x, y } = _findSandPlacementInfiniteMap(map, source);
    if (map[0][500] === "o") break;
    map[y][x] = "o";
    i++;
  }

  return i;
}

// function _partTwo(map: string[][], range: Range) {
//   const source: Coordinate = { x: 500 - range.min.x, y: 0 };

//   map.push(Array(range.max.x - range.min.x + 1).fill("."));
//   map.push(Array(range.max.x - range.min.x + 1).fill("#"));

//   const mapRight: string[][] = createMapOfSize(range.max.y - 0 + 2, 1);
//   mapRight.push(["#"]);
//   const mapLeft: string[][] = createMapOfSize(range.max.y - 0 + 2, 1);
//   mapLeft.push(["#"]);

//   console.log(map);

//   let i = 0;
//   while (true) {
//     // let selectChunk = (coordinate)
//     // let {x,y} = _findInChunks(map, source);

//     let { x, y } = _findSandPlacement(map, source, ({ x, y }) =>
//       _findInAllChunks(map, mapLeft, mapRight)({ x, y })
//     );
//     if (source.x === x && source.y === y) break;
//     if (x < 0) {
//       mapLeft[y][-x - 1] = "o";
//       continue;
//     }
//     if (x >= map[0].length) {
//       mapRight[y][x - map[0].length] = "o";
//       continue;
//     }
//     map[y][x] = "o";
//     i++;
//   }

//   return i;
// }

export function solve(filePath: string = "input.txt") {
  return [_partOne(...parseInput(filePath)), _partTwo(...parseInput(filePath))];
}
