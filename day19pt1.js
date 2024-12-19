import { readFile } from "node:fs/promises";
const input = await readFile("day19input.txt", "utf8");
const [patterns, rest] = input.split("\n\n");

const patternsList = patterns.split(", ");
const usablePatterns = new Set();
for (let length = 1; length < 10; length++) {
  const matching = patternsList.filter((x) => x.length == length);
  if (length == 1) {
    for (const x of matching) {
      console.log("adding", x);
      usablePatterns.add(x);
    }
    continue;
  }
  const regex = new RegExp(`^(?:${[...usablePatterns].join("|")})+$`);
  for (let x of matching) {
    if (!regex.test(x)) {
      console.log("using", x);
      usablePatterns.add(x);
    } else {
      console.log("dropping", x);
    }
  }
}
const regex = new RegExp(`^(?:${[...usablePatterns].join("|")})+$`);
console.log(regex);

const lines = rest.split("\n");
let count = 0;
for (const l of lines) {
  console.log(l);
  console.log(regex.test(l));
  if (regex.test(l)) count++;
}
console.log(count);
