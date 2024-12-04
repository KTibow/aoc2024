import { readFile } from "fs/promises";
const input = await readFile("day4input.txt", "utf8");
const inputArr = input.split("\n").map((l) => [...l]);
let count = 0;
for (let y = 0; y < inputArr.length; y++) {
  const row = inputArr[y];
  for (let x = 0; x < row.length; x++) {
    for (const [dx, dy] of [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
      [-1, -1],
      [-1, 1],
      [1, -1],
      [1, 1],
    ]) {
      const v1 = inputArr[y]?.[x];
      const v2 = inputArr[y + 1 * dy]?.[x + 1 * dx];
      const v3 = inputArr[y + 2 * dy]?.[x + 2 * dx];
      const v4 = inputArr[y + 3 * dy]?.[x + 3 * dx];
      if (v1 == "X" && v2 == "M" && v3 == "A" && v4 == "S") {
        count++;
      }
    }
  }
}
console.log(count);
