import { readFile } from "fs/promises";
const input = await readFile("day9input.txt", "utf8");
const disk = [];

let isData = true;
let id = 0;
for (const n of input) {
  if (isData) {
    for (let i = 0; i < +n; i++) {
      disk.push(id);
    }
    id++;
  } else {
    for (let i = 0; i < +n; i++) {
      disk.push(undefined);
    }
  }
  isData = !isData;
}

for (let idCount = id - 1; idCount >= 0; idCount--) {
  const spotStart = disk.indexOf(idCount);
  if (disk.indexOf(undefined) > spotStart) break;
  const spotEnd = disk.lastIndexOf(idCount);
  const spotLength = spotEnd - spotStart + 1;

  let undefinedFor = 0;
  for (let i = 0; i < spotStart; i++) {
    const v = disk[i];
    if (v == undefined) {
      undefinedFor++;
      if (undefinedFor == spotLength) {
        for (let j = i - (spotLength - 1); j <= i; j++) {
          disk[j] = idCount;
        }
        for (let j = spotStart; j <= spotEnd; j++) {
          disk[j] = undefined;
        }
        console.log("moved", idCount);
        break;
      }
    } else {
      undefinedFor = 0;
    }
  }
}

console.log(
  disk.map((v, i) => (v == undefined ? 0 : v * i)).reduce((a, v) => a + v),
);
