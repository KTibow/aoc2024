import { readFile } from "fs/promises";
const input = await readFile("day3input.txt", "utf8");

const matches = input.matchAll(/\bmul\((\d+?),(\d+?)\)/g);
const values = matches.map((m) => +m[1] * +m[2]);
console.log(values.reduce((a, v) => a + v));
