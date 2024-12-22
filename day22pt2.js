import { readFile } from "node:fs/promises";
const input = await readFile("day22input.txt", "utf8");

const mix = (a, b) => a ^ b;
const prune = (a) => a % BigInt(16777216);
const evolve = (n) => {
  n = mix(n, n * BigInt(64));
  n = prune(n);
  n = mix(n, n / BigInt(32));
  n = prune(n);
  n = mix(n, n * BigInt(2048));
  n = prune(n);
  return n;
};

const sequenceData = {};

for (const nS of input.split("\n")) {
  let n = BigInt(+nS);
  const history = [];
  for (let i = 0; i < 2000; i++) {
    n = evolve(n);
    const price = Number(n % 10n);
    history.push(price);

    if (i >= 4) {
      const sequence = `${history[i - 3] - history[i - 4]},${history[i - 2] - history[i - 3]},${history[i - 1] - history[i - 2]},${history[i] - history[i - 1]}`;
      if (!sequenceData[sequence]) {
        sequenceData[sequence] = {};
      }
      if (!sequenceData[sequence][nS]) {
        sequenceData[sequence][nS] = price;
      }
    }
  }
}

console.log(
  Object.entries(sequenceData)
    .map(([k, v]) => [k, Object.values(v).reduce((a, v) => a + v, 0)])
    .sort((a, b) => b[1] - a[1])[0][1],
);
