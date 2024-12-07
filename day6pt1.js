import { readFile } from "fs/promises";
const input = await readFile("day6input.txt", "utf8");
const grid = input.split("\n").map((l) => [...l]);
let x = 0;
let y = 0;
let direction = [0, -1];
// find start
for (let tempY = 0; tempY < grid.length; tempY++) {
  x = grid[tempY].indexOf("^");
  if (x != -1) {
    y = tempY;
    break;
  }
}

while (true) {
  grid[y][x] = "X";
  const next = grid[y + direction[1]]?.[x + direction[0]];
  if (!next) {
    break;
  }
  if (next == "#") {
    if (direction[0] == 0 && direction[1] == -1) direction = [1, 0];
    else if (direction[0] == 1 && direction[1] == 0) direction = [0, 1];
    else if (direction[0] == 0 && direction[1] == 1) direction = [-1, 0];
    else if (direction[0] == -1 && direction[1] == 0) direction = [0, -1];
  }
  x += direction[0];
  y += direction[1];
}

console.log(grid.flat().filter((p) => p == "X").length);
