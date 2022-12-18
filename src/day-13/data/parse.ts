import path from "path";
import fs from "fs";

export type Packet = [number | Packet] | [];
export type Pair = [Packet | number, Packet | number];

function _parsePacket(chars: string[]): [number, Packet] {
  const packet: any = [];

  for (let index = 0; index < chars.length; index++) {
    const char = chars[index];

    if (char === ",") continue;
    if (char === "[") {
      const [increase, nested] = _parsePacket(chars.slice(index + 1));
      packet.push(nested);
      index += increase;
      continue;
    }
    if (char === "]") {
      return [index + 1, packet];
    }

    packet.push(+char);
  }

  return [0, packet.pop()];
}

function _parsePair(pair: string) {
  return pair.split(/\r?\n/).reduce<Packet[]>((prev, current) => {
    const [_, packet] = _parsePacket(
      current.split(/(\D)/).filter((el) => el !== "")
    );
    return [...prev, packet];
  }, []) as Pair;
}

export function parseInput(filePath: string) {
  const data = fs.readFileSync(path.join(__dirname, `./${filePath}`), "utf-8");

  const pairs = data.split(/\n\n/);

  return pairs.map(_parsePair);
}
