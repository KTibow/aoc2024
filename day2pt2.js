import { readFile } from "fs/promises";
const input = await readFile("day2input.txt", "utf8");
let safe = 0;
for (const l of input.split("\n").filter(Boolean)) {
  const data = l
    .split(" ")
    .filter(Boolean)
    .map((x) => +x);

  const check = (data) => {
    const diffs = [];
    let last = data.shift();
    for (const x of data) {
      diffs.push(x - last);
      last = x;
    }
    return diffs.every(
      (x) => x != 0 && Math.abs(x) <= 3 && Math.sign(x) == Math.sign(diffs[0]),
    );
  };
  if (check([...data])) {
    safe++;
  } else if (
    Array.from({ length: data.length }, (_, i) => {
      const dataClone = [...data];
      dataClone.splice(i, 1);
      return check(dataClone);
    }).some(Boolean)
  ) {
    safe++;
  }
}
console.log(safe);
