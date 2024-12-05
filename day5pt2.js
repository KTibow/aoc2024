import { readFile } from "fs/promises";
const input = await readFile("day5input.txt", "utf8");
const pt1 = input
  .split("\n\n")[0]
  .split("\n")
  .map((l) => l.split("|").map((x) => +x));
const pt2 = input
  .split("\n\n")[1]
  .split("\n")
  .map((l) => l.split(",").map((x) => +x));

let sum = 0;
for (const print of pt2) {
  let done = [];
  let works = true;
  for (const page of print) {
    const relevantRules = pt1
      .filter((x) => x[1] == page)
      .filter((x) => print.includes(x[0]));
    if (!relevantRules.every((x) => done.includes(x[0]))) works = false;
    done.push(page);
  }
  if (works) {
    // nothing
  } else {
    const newOrder = Array.from({ length: print.length });
    for (const page of print) {
      const dependentRules = pt1
        .filter((x) => x[0] == page)
        .filter((x) => print.includes(x[1]));
      newOrder[print.length - dependentRules.length - 1] = page;
    }
    sum += newOrder[Math.floor(print.length / 2)];
  }
}
console.log(sum);
