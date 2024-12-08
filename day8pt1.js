import { readFile } from "fs/promises";
const input = await readFile("day8input.txt", "utf8");
const grid = input.split("\n").map((l) => [...l]);
const gridForAntinodes = grid.map((l) => l.map(() => false));
const frequencyMap = {};
for (let y = 0; y < grid.length; y++) {
  const row = grid[y];
  for (let x = 0; x < row.length; x++) {
    const cell = row[x];
    if (cell == ".") continue;

    if (!frequencyMap[cell]) frequencyMap[cell] = [];
    frequencyMap[cell].push({ x, y });
  }
}
for (const [_, v] of Object.entries(frequencyMap)) {
  if (v.length > 1) {
    for (let i = 0; i < v.length; i++) {
      for (let j = 0; j < i; j++) {
        const a = v[i];
        const b = v[j];
        const delta = { x: a.x - b.x, y: a.y - b.y };
        const p1 = { x: a.x + delta.x, y: a.y + delta.y };
        const p2 = { x: b.x - delta.x, y: b.y - delta.y };
        for (const point of [p1, p2]) {
          if (
            point.x >= 0 &&
            point.y >= 0 &&
            point.x < grid.length &&
            point.y < grid.length
          ) {
            gridForAntinodes[point.y][point.x] = true;
            console.log("set", point.x, point.y);
          }
        }
      }
    }
  }
}
let count = 0;
for (const row of gridForAntinodes) {
  for (const cell of row) {
    if (cell) count++;
  }
}
console.log(
  gridForAntinodes
    .map((l) => l.map((x) => (x ? "!" : " ")).join(""))
    .join("\n"),
);
console.log(count);
