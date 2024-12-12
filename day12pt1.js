import { readFile } from "fs/promises";
const input = await readFile("day12input.txt", "utf8");
const grid = input.split("\n").map((l) => [...l]);

let cost = 0;
for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid.length; x++) {
    const v = grid[y][x];
    if (v == ".") continue;

    const points = new Set();
    const search = (x, y) => {
      if (grid[y][x] != v) return;

      const str = `${x},${y}`;
      if (points.has(str)) return;
      points.add(str);

      if (x > 0) search(x - 1, y);
      if (x < grid.length - 1) search(x + 1, y);
      if (y > 0) search(x, y - 1);
      if (y < grid.length - 1) search(x, y + 1);
    };
    search(x, y);

    for (const point of points) {
      const [xS, yS] = point.split(",");
      grid[+yS][+xS] = ".";
    }

    const area = points.size;
    let perimeter = points.size * 4;
    for (const point of points) {
      const [xS, yS] = point.split(",");
      if (points.has(`${+xS - 1},${yS}`)) perimeter--;
      if (points.has(`${+xS + 1},${yS}`)) perimeter--;
      if (points.has(`${xS},${+yS - 1}`)) perimeter--;
      if (points.has(`${xS},${+yS + 1}`)) perimeter--;
    }

    cost += area * perimeter;
  }
}

console.log(cost);
