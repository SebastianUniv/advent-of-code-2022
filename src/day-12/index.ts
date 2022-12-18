import { parseInput, Coordinate } from "./data/parse";

function heuristic([nX, nY]: Coordinate, [endX, endY]: Coordinate) {
  return Math.sqrt(Math.pow(nX - endX, 2) + Math.pow(nY - endY, 2));
}

function _enqueue(queue: Coordinate[], score: number[][], point: Coordinate) {
  queue.push(point);
  queue.sort(([aX, aY], [bX, bY]) => {
    if (score[aY][aX] < score[bY][bX]) {
      return -1;
    } else {
      return 1;
    }
  });

  return queue;
}

function _reconstruct(
  cameFrom: Map<number, Map<number, Coordinate>>,
  current: Coordinate
) {
  let path = [];

  while (
    cameFrom.has(current[0]) &&
    cameFrom.get(current[0])!.has(current[1])
  ) {
    current = cameFrom.get(current[0])!.get(current[1])!;
    path.push(current);
  }

  return path;
}

function _astar([map, start, end]: [number[][], Coordinate, Coordinate]) {
  const [y, x] = start;
  let cameFrom: Map<number, Map<number, Coordinate>> = new Map();

  let gScore: number[][] = Array(map.length)
    .fill(null)
    .map(() => {
      return Array(map[0].length).fill(Infinity);
    });

  gScore[x][y] = 0;

  let fScore: number[][] = Array(map.length)
    .fill(null)
    .map(() => {
      return Array(map[0].length).fill(Infinity);
    });

  gScore[x][y] = 1;

  let openSet = _enqueue([], fScore, start);

  while (openSet.length > 0) {
    const [curX, curY] = openSet.shift()!;

    if (curX === end[0] && curY === end[1]) {
      let path = _reconstruct(cameFrom, [curX, curY]);

      return path;
    }

    const neighbours: Coordinate[] = [
      [curX - 1, curY],
      [curX + 1, curY],
      [curX, curY - 1],
      [curX, curY + 1],
    ];

    for (const neighbour of neighbours) {
      const [nX, nY] = neighbour;
      if (map?.[nY]?.[nX] === undefined) continue;
      if (map?.[nY]?.[nX] - map?.[curY]?.[curX] > 1) continue;

      let tentativeScore = gScore[curY][curX] + 1;
      if (tentativeScore < gScore[nY][nX]) {
        cameFrom.get(nX)
          ? cameFrom.get(nX)!.set(nY, [curX, curY])
          : cameFrom.set(nX, new Map([[nY, [curX, curY]]]));

        gScore[nY][nX] = tentativeScore;
        fScore[nY][nX] = tentativeScore + heuristic(neighbour, end);

        if (!openSet.includes(neighbour)) {
          _enqueue(openSet, fScore, neighbour);
        }
      }
    }
  }

  return [];
}

function _partOne([map, start, end]: [number[][], Coordinate, Coordinate]) {
  return _astar([map, start, end]).length;
}

function _partTwo([map, start, end]: [number[][], Coordinate, Coordinate]) {
  const path = _astar([map, start, end]);

  while (path.length > 0) {
    const [stepX, stepY] = path[path.length - 1];
    const height = "a".charCodeAt(0);

    if (map[stepY][stepX] === height) {
      path.pop();
    } else {
      break;
    }
  }

  return path.length;
}

export function solve(filePath: string = "input.txt") {
  const map = parseInput(filePath);

  return [_partOne(map), _partTwo(map)];
}
