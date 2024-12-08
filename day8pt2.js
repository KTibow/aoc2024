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
        const gcd = (a, b) => {
          if (b == 0) return a;
          return gcd(b, a % b);
        };
        const deltaGcd = gcd(delta.x, delta.y);
        delta.x /= deltaGcd;
        delta.y /= deltaGcd;

        let x = b.x - delta.x;
        let y = b.y - delta.y;
        console.log(a, b, delta, x, y);
        while (x >= 0 && y >= 0 && x < grid.length && y < grid.length) {
          gridForAntinodes[y][x] = true;
          console.log("set", x, y);
          x -= delta.x;
          y -= delta.y;
        }
        console.log("-");
        x = a.x + delta.x;
        y = a.y + delta.y;
        while (x >= 0 && y >= 0 && x < grid.length && y < grid.length) {
          gridForAntinodes[y][x] = true;
          console.log("set", x, y);
          x += delta.x;
          y += delta.y;
        }
        console.log("=");
        gridForAntinodes[a.y][a.x] = true;
        gridForAntinodes[b.y][b.x] = true;
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
