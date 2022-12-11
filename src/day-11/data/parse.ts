import path from "path";
import fs from "fs";

const operations: { [key: string]: (a: number, b: number) => number } = {
  "+": (a: number, b: number) => a + b,
  "-": (a: number, b: number) => a - b,
  "*": (a: number, b: number) => a * b,
};

type Operation = [
  value: number | string,
  operator: string,
  value: number | string
];
export type Monkey = {
  items: number[];
  inspect: (value: number) => number;
  divisor: number;
  action: Map<boolean, number>;
};

function _createOperatorFn([value1, operation, value2]: Operation) {
  return (value: number) => {
    return operations[operation](
      +value1 ? +value1 : value,
      +value2 ? +value2 : value
    );
  };
}

export function parseInput(filePath: string) {
  const data = fs.readFileSync(path.join(__dirname, `./${filePath}`), "utf-8");

  const monkeySegments = data.split(/\n\n/);

  return monkeySegments.map((monkeySegment) => {
    const [items, operation, test, ifTrue, ifFalse] = monkeySegment
      .split(/\r?\n/)
      .slice(1);

    return {
      items: items
        .split(":")[1]
        .split(", ")
        .map((num) => +num),
      inspect: _createOperatorFn(
        operation
          .split(":")[1]
          .split("=")[1]
          .trim()
          .split(" ")
          .map((expr) => (+expr ? +expr : expr)) as Operation
      ),
      divisor: +test.split(" ").pop()!,
      action: new Map<boolean, number>([
        [true, +ifTrue.split(" ").pop()!],
        [false, +ifFalse.split(" ").pop()!],
      ]),
    };
  });
}
