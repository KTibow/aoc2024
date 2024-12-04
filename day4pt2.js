import { readFile } from "fs/promises";
const input = await readFile("day4input.txt", "utf8");
const inputArr = input.split("\n").map((l) => [...l]);
let count = 0;
for (let y = 0; y < inputArr.length; y++) {
  const row = inputArr[y];
  for (let x = 0; x < row.length; x++) {
    if (row[x] == "A") {
      const v1 = inputArr[y - 1]?.[x - 1];
      const v2 = inputArr[y - 1]?.[x + 1];
      const v3 = inputArr[y + 1]?.[x - 1];
      const v4 = inputArr[y + 1]?.[x + 1];
      if (v1 == "M" && v2 == "M" && v3 == "S" && v4 == "S") count++;
      else if (v1 == "S" && v2 == "S" && v3 == "M" && v4 == "M") count++;
      else if (v1 == "M" && v2 == "S" && v3 == "M" && v4 == "S") count++;
      else if (v1 == "S" && v2 == "M" && v3 == "S" && v4 == "M") count++;
    }
  }
}
console.log(count);
