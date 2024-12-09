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

for (let i = disk.length - 1; i >= 0; i--) {
  const v = disk[i];
  if (v == undefined) continue;

  const firstSpot = disk.indexOf(undefined);
  if (firstSpot > i) break;
  console.log(firstSpot);

  disk[firstSpot] = v;
  disk[i] = undefined;
}

console.log(
  disk
    .filter((v) => v != undefined)
    .map((v, i) => v * i)
    .reduce((a, v) => a + v),
);
