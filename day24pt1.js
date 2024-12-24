import { readFile } from "node:fs/promises";
const input = await readFile("day24input.txt", "utf8");

const [valuesS, connsS] = input.split("\n\n");
const values = valuesS.split("\n").map((v) => v.split(": "));
const conns = connsS
  .split("\n")
  .map((v) => v.match(/^(.+?) ([A-Z]+) (.+?) -> (.+?)$/).slice(1));

const ways = Object.fromEntries(values.map(([k, v]) => [k, +v]));

const evaluate = (key) => {
  if (ways[key] != undefined) return ways[key];
  const definition = conns.find((c) => c[3] == key);

  const v1 = evaluate(definition[0]);
  const v2 = evaluate(definition[2]);

  let out;
  if (definition[1] == "OR") out = v1 | v2;
  if (definition[1] == "XOR") out = v1 ^ v2;
  if (definition[1] == "AND") out = v1 & v2;
  ways[key] = out;
  return out;
};

let output = "";
const zs = conns
  .map((c) => c[3])
  .filter((x) => x.startsWith("z"))
  .sort((a, b) => +b.slice(1) - +a.slice(1));
for (const z of zs) {
  output += evaluate(z);
}
console.log(parseInt(output, 2));
