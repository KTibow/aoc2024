import { readFile } from "fs/promises";
const input = await readFile("day10input.txt", "utf8");
const grid = input.split("\n").map((l) => Array.from(l, (x) => +x));

let score = 0;
for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    if (grid[y][x] == 0) {
      // trailhead
      let rating = 0;
      const recurse = (x, y) => {
        const v = grid[y]?.[x];
        if (v == 9) {
          rating++;
          return;
        }
        const left = grid[y]?.[x - 1];
        const right = grid[y]?.[x + 1];
        const up = grid[y - 1]?.[x];
        const down = grid[y + 1]?.[x];
        if (left == v + 1) {
          recurse(x - 1, y);
        }
        if (right == v + 1) {
          recurse(x + 1, y);
        }
        if (up == v + 1) {
          recurse(x, y - 1);
        }
        if (down == v + 1) {
          recurse(x, y + 1);
        }
      };
      recurse(x, y);
      score += rating;
    }
  }
}
console.log(score);
