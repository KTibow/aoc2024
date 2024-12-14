import { readFile } from "fs/promises";
const input = await readFile("day14input.txt", "utf8");
const robots = input.split("\n").map((l) => {
  const [, px, py, vx, vy] = l.match(/^p=(\d+),(\d+) v=([0-9-]+),([0-9-]+)$/);
  return { px: +px, py: +py, vx: +vx, vy: +vy };
});
const w = 101;
const h = 103;
let iterations = 0;

const records = [];

while (iterations < 100000) {
  for (const r of robots) {
    r.px += r.vx;
    r.px %= w;
    r.px += w;
    r.px %= w;
    r.py += r.vy;
    r.py %= h;
    r.py += h;
    r.py %= h;
  }
  iterations++;

  const avgX = robots.map((r) => r.px).reduce((a, v) => a + v) / robots.length;
  const avgY = robots.map((r) => r.py).reduce((a, v) => a + v) / robots.length;
  const deviationX =
    robots.map((r) => Math.abs(r.px - avgX)).reduce((a, v) => a + v) /
    robots.length;
  const deviationY =
    robots.map((r) => Math.abs(r.py - avgY)).reduce((a, v) => a + v) /
    robots.length;

  if (deviationX + deviationY < 35) {
    console.log(iterations, deviationX, deviationY);
  }
}
