import { readFile } from "fs/promises";
const input = await readFile("day3input.txt", "utf8");

const enabled = Array.from({ length: input.length }, () => true);
for (const m of input.matchAll(/(do(?:n't)?)\(\)/g)) {
  if (m[1] == "do") {
    for (let i = m.index; i < enabled.length; i++) {
      enabled[i] = true;
    }
  } else {
    for (let i = m.index; i < enabled.length; i++) {
      enabled[i] = false;
    }
  }
}
const matches = input.matchAll(/\bmul\((\d+?),(\d+?)\)/g);
const values = matches
  .filter((m) => enabled[m.index])
  .map((m) => +m[1] * +m[2]);
console.log(values.reduce((a, v) => a + v));
