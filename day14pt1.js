import { readFile } from "fs/promises";
const input = await readFile("day14input.txt", "utf8");
const robots = input.split("\n").map((l) => {
  const [, px, py, vx, vy] = l.match(/^p=(\d+),(\d+) v=([0-9-]+),([0-9-]+)$/);
  return { px: +px, py: +py, vx: +vx, vy: +vy };
});
const w = 101;
const h = 103;
const iterations = 100;

for (const r of robots) {
  r.px += r.vx * iterations;
  r.px %= w;
  r.px += w;
  r.px %= w;
  r.py += r.vy * iterations;
  r.py %= h;
  r.py += h;
  r.py %= h;
}

let q1 = 0;
let q2 = 0;
let q3 = 0;
let q4 = 0;
for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    if (w - 1 - x == x) continue;
    if (h - 1 - y == y) continue;
    if (x < w / 2 && y < h / 2) {
      const count = robots.filter((r) => r.px == x && r.py == y).length;
      q1 += count;
    }
    if (x > w / 2 && y < h / 2) {
      const count = robots.filter((r) => r.px == x && r.py == y).length;
      q2 += count;
    }
    if (x < w / 2 && y > h / 2) {
      const count = robots.filter((r) => r.px == x && r.py == y).length;
      q3 += count;
    }
    if (x > w / 2 && y > h / 2) {
      const count = robots.filter((r) => r.px == x && r.py == y).length;
      q4 += count;
    }
  }
}
console.log(q1, q2, q3, q4);
console.log(q1 * q2 * q3 * q4);
