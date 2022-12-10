import { Direction, Move, parseInput } from "./data/parse";

type Pointer = [x: number, y: number];
type Locations = Map<number, Set<number>>;

function _directionToPosition(pointer: Pointer, direction: Direction): Pointer {
  let [x, y] = pointer;

  switch (direction) {
    case Direction.UP:
      y++;
      break;
    case Direction.DOWN:
      y--;
      break;
    case Direction.RIGHT:
      x++;
      break;
    case Direction.LEFT:
      x--;
      break;
  }

  return [x, y];
}

function _headPositionToTailMove(tail: Pointer, head: Pointer): Pointer {
  let [xt, yt] = tail;
  const [xh, yh] = head;

  const mutateHorizontal = () => (xt = xt + (xh - xt > 0 ? 1 : -1));
  const mutateVertical = () => (yt = yt + (yh - yt > 0 ? 1 : -1));

  if (Math.abs(xh - xt) === 2 && yh - yt === 0) {
    mutateHorizontal();
  }
  if (xh - xt === 0 && Math.abs(yh - yt) === 2) {
    mutateVertical();
  }
  if (
    (Math.abs(xh - xt) === 2 && Math.abs(yh - yt) === 1) ||
    (Math.abs(xh - xt) === 1 && Math.abs(yh - yt) === 2) ||
    (Math.abs(xh - xt) === 2 && Math.abs(yh - yt) === 2)
  ) {
    mutateHorizontal();
    mutateVertical();
  }

  return [xt, yt];
}

function _simulateRope([head, ...tail]: Pointer[], direction: Direction) {
  head = _directionToPosition(head, direction);

  return tail.reduce<Pointer[]>(
    (prev, knot, index) => [
      ...prev,
      _headPositionToTailMove(knot, prev[index]),
    ],
    [head]
  );
}

function _setLocationVisited(ref: Locations, [x, y]: Pointer) {
  ref.set(x, ref.get(x) ? ref.get(x)!.add(y) : new Set([y]));
}

function _countLocationsVisited(ref: Locations) {
  let visited = 0;

  ref.forEach((x) => {
    visited += x.size;
  });

  return visited;
}

function _calcLocationsVisited(rope: Pointer[], moves: Move[]) {
  let locations: Locations = new Map();

  moves.forEach((move) => {
    const [direction, count] = move;

    for (let i = 0; i < count; i++) {
      rope = _simulateRope(rope, direction);
      _setLocationVisited(locations, rope[rope.length - 1]);
    }
  });

  return _countLocationsVisited(locations);
}

function _partOne(moves: Move[]) {
  return _calcLocationsVisited(
    [...Array(2)].map(() => [0, 0]),
    moves
  );
}

function _partTwo(moves: Move[]) {
  return _calcLocationsVisited(
    [...Array(10)].map(() => [0, 0]),
    moves
  );
}

export function solve(filePath: string = "input.txt") {
  const moves = parseInput(filePath);

  return [_partOne(moves), _partTwo(parseInput(filePath))];
}
