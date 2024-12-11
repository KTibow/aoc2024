import { readFile } from "fs/promises";
const input = await readFile("day11input.txt", "utf8");

const resultCache = {};
const doThing = (x, iterationsRemaining) => {
  if (iterationsRemaining == 0) return 1;

  if (x == 0) {
    return doThing(1, iterationsRemaining - 1);
  }
  if (x < 10) {
    const lookup = resultCache[`${x}-${iterationsRemaining}`];
    if (lookup) {
      return lookup;
    }
    const r = doThing(x * 2024, iterationsRemaining - 1);
    resultCache[`${x}-${iterationsRemaining}`] = r;
    return r;
  }
  const l = Math.floor(Math.log10(x)) + 1;
  if (l % 2 == 0) {
    const f = 10 ** (l / 2);
    const largeBit = Math.floor(x / f);
    const smallBit = x % f;
    if (largeBit == smallBit)
      return 2 * doThing(smallBit, iterationsRemaining - 1);
    return (
      doThing(largeBit, iterationsRemaining - 1) +
      doThing(smallBit, iterationsRemaining - 1)
    );
  }
  return doThing(x * 2024, iterationsRemaining - 1);
};

let count = 0;
for (const stone of input.split(" ").map((x) => +x)) {
  console.log("doing stone", stone);
  count += doThing(stone, 75);
}

console.log(count);
