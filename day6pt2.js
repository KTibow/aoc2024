import { readFile } from "fs/promises";
const input = await readFile("day6input.txt", "utf8");
const grid = input.split("\n").map((l) => [...l]);
const isLoop = (grid) => {
  let x = 0;
  let y = 0;
  let direction = [0, -1];
  const visited = new Set();
  // find start
  for (let tempY = 0; tempY < grid.length; tempY++) {
    x = grid[tempY].indexOf("^");
    if (x != -1) {
      y = tempY;
      break;
    }
  }

  while (true) {
    const pos = (
      x * 100000000 +
      y * 100000 +
      direction[0] * 100 +
      direction[1]
    ).toString();
    if (visited.has(pos)) {
      return true;
    }
    visited.add(pos);
    grid[y][x] = "X";
    const next = grid[y + direction[1]]?.[x + direction[0]];
    if (!next) {
      return false;
    }
    if (next == "#") {
      if (direction[0] == 0 && direction[1] == -1) direction = [1, 0];
      else if (direction[0] == 1 && direction[1] == 0) direction = [0, 1];
      else if (direction[0] == 0 && direction[1] == 1) direction = [-1, 0];
      else if (direction[0] == -1 && direction[1] == 0) direction = [0, -1];
      continue;
    }
    x += direction[0];
    y += direction[1];
  }
};
let workingPositionCount = 0;
for (let y = 0; y < grid.length; y++) {
  console.log(y + 1, "/", grid.length);
  for (let x = 0; x < grid[y].length; x++) {
    if (grid[y][x] == ".") {
      const newGrid = structuredClone(grid);
      newGrid[y][x] = "#";
      if (isLoop(newGrid)) {
        // console.log(x, y);
        workingPositionCount++;
      }
    }
  }
}
console.log(workingPositionCount);
