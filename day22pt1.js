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

let sum = 0n;
for (const nS of input.split("\n")) {
  let n = BigInt(+nS);
  for (let i = 0; i < 2000; i++) n = evolve(n);
  sum += n;
}
console.log(sum);
