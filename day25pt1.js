import { readFile } from "node:fs/promises";
const input = await readFile("day25input.txt", "utf8");

const things = input.split("\n\n").map((x) => x.split("\n").map((l) => [...l]));
const locks = [];
const keys = [];
for (const thing of things) {
  if (thing[0][0] == "#") {
    const sequence = [];
    for (let x = 0; x < thing[0].length; x++) {
      let n = 0;
      while (thing[n][x] == "#") {
        n++;
      }
      n--;
      sequence.push(n);
    }
    locks.push(sequence);
  } else {
    const sequence = [];
    for (let x = 0; x < thing[0].length; x++) {
      let n = 0;
      while (thing[thing.length - 1 - n][x] == "#") {
        n++;
      }
      n--;
      sequence.push(n);
    }
    keys.push(sequence);
  }
}
let n = 0;
for (let i = 0; i < locks.length; i++) {
  const l = locks[i];
  for (let j = 0; j < keys.length; j++) {
    const k = keys[j];
    const works = l.every((v, x) => v + k[x] < 6);

    if (works) {
      n++;
    }
  }
}
console.log(n);
