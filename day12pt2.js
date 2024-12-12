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
    const perimeters = new Set();
    for (const point of points) {
      const [xS, yS] = point.split(",");
      if (!points.has(`${+xS - 1},${yS}`)) perimeters.add(`l${xS},${yS}`);
      if (!points.has(`${+xS + 1},${yS}`)) perimeters.add(`r${xS},${yS}`);
      if (!points.has(`${xS},${+yS - 1}`)) perimeters.add(`u${xS},${yS}`);
      if (!points.has(`${xS},${+yS + 1}`)) perimeters.add(`d${xS},${yS}`);
    }
    for (let i = -1; i < grid.length; i++) {
      for (let j = -1; j < grid.length; j++) {
        if (perimeters.has(`l${i},${j}`)) {
          for (let delta = 1; perimeters.has(`l${i},${j + delta}`); delta++) {
            perimeters.delete(`l${i},${j + delta}`);
          }
        }
        if (perimeters.has(`r${i},${j}`)) {
          for (let delta = 1; perimeters.has(`r${i},${j + delta}`); delta++) {
            perimeters.delete(`r${i},${j + delta}`);
          }
        }
        if (perimeters.has(`u${i},${j}`)) {
          for (let delta = 1; perimeters.has(`u${i + delta},${j}`); delta++) {
            perimeters.delete(`u${i + delta},${j}`);
          }
        }
        if (perimeters.has(`d${i},${j}`)) {
          for (let delta = 1; perimeters.has(`d${i + delta},${j}`); delta++) {
            perimeters.delete(`d${i + delta},${j}`);
          }
        }
      }
    }

    cost += area * perimeters.size;
  }
}

console.log(cost);
