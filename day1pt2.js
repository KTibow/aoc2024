import { readFile } from "fs/promises";
const input = await readFile("day1input.txt", "utf8");
const list = input
  .split("\n")
  .filter(Boolean)
  .map((x) => {
    const [, a, b] = x.match(/(\d+)\s+(\d+)/);
    return [+a, +b];
  });
const list1 = list.map((x) => x[0]).toSorted();
const list2 = list.map((x) => x[1]).toSorted();
const list2AsCount = list2.reduce((a, v) => {
  a[v] = (a[v] || 0) + 1;
  return a;
}, {});
console.log(
  list1.reduce((a, v, i) => {
    return a + v * (list2AsCount[v] || 0);
  }, 0),
);
