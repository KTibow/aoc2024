import { readFile } from "fs/promises";
const input = await readFile("day13input.txt", "utf8");
const machines = input.split("\n\n").map((mStr) => {
  const [, b1x, b1y, b2x, b2y, x, y] = mStr.match(
    /Button A: X\+(\d+), Y\+(\d+)\nButton B: X\+(\d+), Y\+(\d+)\nPrize: X=(\d+), Y=(\d+)/,
  );
  return {
    b1x: +b1x,
    b1y: +b1y,
    b2x: +b2x,
    b2y: +b2y,
    x: +x + 10000000000000,
    y: +y + 10000000000000,
    // remove that for part 1
  };
});
let usage = 0;
for (const { b1x, b1y, b2x, b2y, x, y } of machines) {
  const eq1m = -b1x / b2x;
  const eq1b = x / b2x;
  const eq2m = -b1y / b2y;
  const eq2b = y / b2y;
  const leftSideCoefficient = eq1m - eq2m;
  const rightSide = eq2b - eq1b;
  const presses1 = rightSide / leftSideCoefficient;
  if (presses1 % 1 < 0.001 || presses1 % 1 > 0.999) {
    const presses2 = presses1 * eq1m + eq1b;
    if (presses2 % 1 < 0.001 || presses2 % 1 > 0.999) {
      usage += Math.round(presses1) * 3 + Math.round(presses2);
    }
  }
}
console.log(usage);
