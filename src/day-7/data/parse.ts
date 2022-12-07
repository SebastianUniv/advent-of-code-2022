import fs from "fs";
import path from "path";

type File = [name: string, size: number];
export type Directory = {
  directories: {
    [name: string]: Directory;
  };
  files: File[];
};

function _pointerToDirectory(pointer: string[], fileDirectory: Directory) {
  return pointer.reduce(({ directories }, next) => {
    if (!Object.hasOwn(directories, next)) {
      directories[next] = {
        directories: {},
        files: [],
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
    files: [],
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

    const [size, name] = parsedLine.slice(0, 2);
    const ref = _pointerToDirectory(pointer, fileDirectory);

    ref.files.push([name, +size]);
  });

  return fileDirectory;
}
