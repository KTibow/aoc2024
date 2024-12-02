import { readFile } from "fs/promises";
const input = await readFile("day2input.txt", "utf8");
const safe = input
  .split("\n")
  .filter(Boolean)
  .map((l) =>
    l
      .split(" ")
      .filter(Boolean)
      .map((x) => +x)
  )
  // use this for pt 1
  .map((data) => [[...data]])
  // use this for pt 2
  //   .map((data) =>
  //     [
  //       [...data],
  //       ...Array.from({ length: data.length }, (_, i) => data.toSpliced(i, 1)),
  //     ]
  //   )
  .map((datas) => datas.flatMap((data) => [data, data.toReversed()]))
  .filter((datas) =>
    datas.some((data) => {
      const diffs = [];
      let last = data.shift();
      for (const x of data) {
        diffs.push(x - last);
        last = x;
      }
      return diffs.every((x) => x > 0 && x <= 3);
    })
  ).length;
console.log(safe);
