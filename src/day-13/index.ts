import { Packet, Pair, parseInput } from "./data/parse";

function _comparePackets([pLeft, pRight]: Pair): number {
  if (Number.isInteger(pLeft) && Number.isInteger(pRight)) {
    if (pLeft > pRight) return -1;
    if (pLeft === pRight) return 0;

    return 1;
  }
  if (pLeft instanceof Array && pRight instanceof Array) {
    if (pLeft.length === 0 && pRight.length > 0) return 1;

    for (let index = 0; index < pLeft.length; index++) {
      if (index >= pRight.length) return -1;

      const left = pLeft[index];
      const right = pRight[index];

      const result = _comparePackets([left, right]);

      if (result === -1) return -1;
      if (result === 1) return 1;
    }

    if (pLeft.length < pRight.length) return 1;

    return 0;
  }
  if (Number.isInteger(pLeft) && pRight instanceof Array) {
    return _comparePackets([[pLeft], pRight]);
  }
  if (pLeft instanceof Array && Number.isInteger(pRight)) {
    return _comparePackets([pLeft, [pRight]]);
  }

  return 0;
}

function _partOne(pairs: Pair[]) {
  return pairs.reduce((prev, pair, index) => {
    return prev + (_comparePackets(pair) > 0 ? index + 1 : 0);
  }, 0);
}

function _partTwo(pairs: Pair[]) {
  const packets = pairs.reduce<Packet[]>((packets, pair) => {
    const temp = [...pair] as Packet[];
    return [...packets, ...temp];
  }, []);

  const dividers: Packet[] = [[[2]], [[6]]];

  return [...packets, ...dividers]
    .sort((a, b) => _comparePackets([b, a]))
    .reduce((key, packet, index) => {
      return key * (dividers.includes(packet) ? index + 1 : 1);
    }, 1);
}

export function solve(filePath: string = "input.txt") {
  const pairs = parseInput(filePath);

  return [_partOne(pairs), _partTwo(parseInput(filePath))];
}
