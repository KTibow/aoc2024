import { readFile } from "fs/promises";
const input = await readFile("day15input.txt", "utf8");
const [gridS, movesS] = input.split("\n\n");
let grid = gridS
  .split("\n")
  .map((l) =>
    [...l].flatMap(
      (x) =>
        ({ "#": ["#", "#"], O: ["[", "]"], ".": [".", "."], "@": ["@", "."] })[
          x
        ],
    ),
  );
const moves = [...movesS]
  .filter((x) => x != "\n")
  .map((x) => ({ "^": [0, -1], v: [0, 1], "<": [-1, 0], ">": [1, 0] })[x]);

let i = 0;
for (const m of moves) {
  console.log(++i, moves.length);
  let robotX, robotY;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid.length * 2; x++) {
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

  const impacted = new Set();
  let works = true;
  const lookAt = (x, y) => {
    const here = `${x},${y}`;
    if (impacted.has(here) || !works) {
      return;
    }
    if (grid[y][x] == "#") {
      works = false;
      return;
    }
    if (grid[y][x] == "[" || grid[y][x] == "]") {
      if (m[0] == 0) {
        const xLeft = grid[y][x] == "[" ? x : x - 1;
        impacted.add(`${xLeft},${y}`);
        impacted.add(`${xLeft + 1},${y}`);
        lookAt(xLeft, y + m[1]);
        lookAt(xLeft + 1, y + m[1]);
      } else if (m[0] == -1) {
        if (grid[y][x] == "[") {
          impacted.add(`${x},${y}`);
          impacted.add(`${x + 1},${y}`);
          lookAt(x - 1, y);
        } else {
          impacted.add(`${x - 1},${y}`);
          impacted.add(`${x},${y}`);
          lookAt(x - 2, y);
        }
      } else if (m[0] == 1) {
        if (grid[y][x] == "[") {
          impacted.add(`${x},${y}`);
          impacted.add(`${x + 1},${y}`);
          lookAt(x + 2, y);
        } else {
          impacted.add(`${x - 1},${y}`);
          impacted.add(`${x},${y}`);
          lookAt(x + 1, y);
        }
      }
    }
  };
  lookAt(robotX + m[0], robotY + m[1]);

  if (works) {
    console.log(impacted);
    const newGrid = structuredClone(grid);
    const points = Array.from(impacted, (x) => x.split(",").map((v) => +v));
    newGrid[robotY][robotX] = ".";
    for (const [x, y] of points) {
      newGrid[y][x] = ".";
    }
    for (const [x, y] of points) {
      newGrid[y + m[1]][x + m[0]] = grid[y][x];
    }
    newGrid[robotY + m[1]][robotX + m[0]] = "@";
    grid = newGrid;
  }
}
console.log(grid.map((l) => l.join("")).join("\n"));

let sum = 0;
for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid.length * 2; x++) {
    if (grid[y][x] == "[") {
      sum += y * 100 + x;
    }
  }
}
console.log(sum);
