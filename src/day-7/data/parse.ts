import fs from "fs";
import path from "path";

export type Directory = {
  directories: {
    [name: string]: Directory;
  };
  filesSize: number;
};

function _pointerToDirectory(pointer: string[], fileDirectory: Directory) {
  return pointer.reduce(({ directories }, next) => {
    if (!Object.hasOwn(directories, next)) {
      directories[next] = {
        directories: {},
        filesSize: 0,
      };
    }

    return directories[next];
  }, fileDirectory);
}

function _mutatePointer(pointer: string[], location: string) {
  switch (location) {
    case "/":
      pointer.length = 0;
      break;
    case "..":
      pointer.pop();
      break;
    default:
      pointer.push(location);
  }
}

export function parseInput(filePath: string) {
  let fileDirectory: Directory = {
    directories: {},
    filesSize: 0,
  };
  const data = fs.readFileSync(path.join(__dirname, `./${filePath}`), "utf-8");
  const lines = data.split(/\r?\n/);

  const pointer: string[] = [];

  lines.forEach((line) => {
    const parsedLine = line.split(" ");
    const command = parsedLine.slice(0, 2).join(" ");

    if (command === "$ ls" || command.includes("dir")) {
      return;
    }

    if (command === "$ cd") {
      _mutatePointer(pointer, parsedLine[2]);
      return;
    }

    const ref = _pointerToDirectory(pointer, fileDirectory);

    ref.filesSize += +parsedLine[0];
  });

  return fileDirectory;
}
