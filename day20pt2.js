import { readFile } from "node:fs/promises";
const input = await readFile("day20input.txt", "utf8");
const grid = input.split("\n").map((l) => [...l]);

let start;
let end;
for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid.length; x++) {
    if (grid[y][x] == "S") {
      start = [x, y];
      grid[y][x] = ".";
    } else if (grid[y][x] == "E") {
      end = [x, y];
      grid[y][x] = ".";
    }
  }
}

const secsGlobal = {};
// precompute
for (let y = 0; y < grid.length; y++) {
  console.log("precomputing", y, "/", grid.length);
  for (let x = 0; x < grid.length; x++) {
    if (grid[y][x] != ".") continue;

    const visitedSet = new Set();
    const openSet = new Set();
    const place = `${x},${y}`;
    openSet.add(place);
    secsGlobal[place] = {};
    secsGlobal[place][place] = 0;
    while (openSet.size) {
      for (const p of openSet) {
        openSet.delete(p);
        visitedSet.add(p);
        const [x, y] = p.split(",").map((x) => +x);
        for (const [x2, y2] of [
          [x - 1, y],
          [x + 1, y],
          [x, y - 1],
          [x, y + 1],
        ]) {
          if (grid[y2][x2] == "." && !visitedSet.has(`${x2},${y2}`)) {
            secsGlobal[place][`${x2},${y2}`] = secsGlobal[place][p] + 1;
            openSet.add(`${x2},${y2}`);
          }
        }
      }
    }
  }
}
const timeBetween = (a, b) => {
  const aStr = `${a[0]},${a[1]}`;
  const bStr = `${b[0]},${b[1]}`;
  return secsGlobal[aStr][bStr];
};

let count = 0;
const done = new Set();
for (let y = 0; y < grid.length; y++) {
  console.log(y, "/", grid.length);
  for (let x = 0; x < grid.length; x++) {
    if (grid[y][x] != ".") continue;
    for (let y2 = 0; y2 < grid.length; y2++) {
      for (let x2 = 0; x2 < grid.length; x2++) {
        if (grid[y2][x2] != ".") continue;
        const time = Math.abs(x2 - x) + Math.abs(y2 - y);
        if (time > 20) continue;
        if (time < 2) continue;
        const r = `${x},${y},${x2},${y2}`;
        if (done.has(r)) continue;
        done.add(r);
        done.add(`${x2},${y2},${x},${y}`);
        if (timeBetween([x, y], [x2, y2]) - time >= 100) {
          count++;
        }
      }
    }
  }
}
console.log(count);
