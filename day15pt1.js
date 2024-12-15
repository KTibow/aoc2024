import { readFile } from "fs/promises";
const input = await readFile("day15input.txt", "utf8");
const [gridS, movesS] = input.split("\n\n");
let grid = gridS.split("\n").map((l) => [...l]);
const moves = [...movesS]
  .filter((x) => x != "\n")
  .map((x) => ({ "^": [0, -1], v: [0, 1], "<": [-1, 0], ">": [1, 0] })[x]);
for (const m of moves) {
  let robotX, robotY;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid.length; x++) {
      if (grid[y][x] == "@") {
        robotX = x;
        robotY = y;
      }
    }
  }
  let xPointer = robotX,
    yPointer = robotY;
  xPointer += m[0];
  yPointer += m[1];
  if (grid[yPointer][xPointer] == ".") {
    grid[yPointer][xPointer] = "@";
    grid[robotY][robotX] = ".";
    continue;
  }

  let worked;
  while (true) {
    const v = grid[yPointer][xPointer];
    if (v == "#") {
      worked = false;
      break;
    } else if (v == ".") {
      worked = true;
      break;
    }
    // otherwise it's a block

    xPointer += m[0];
    yPointer += m[1];
  }
  if (worked) {
    grid[robotY][robotX] = ".";
    grid[robotY + m[1]][robotX + m[0]] = "@";
    grid[yPointer][xPointer] = "O";
  }
}

let sum = 0;
for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid.length; x++) {
    if (grid[y][x] == "O") {
      sum += y * 100 + x;
    }
  }
}
console.log(sum);
