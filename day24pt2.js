import { readFile } from "node:fs/promises";
let input = await readFile("day24input.txt", "utf8");

// yes i didnt write a program to find them
// yes i searched around finding discrepancies manually
// yes this program has been messed up a lot in the process of trying different stuff
// yes it took way too long
// yes im still proud anyway
input =
  input
    .replace("fsf OR nqs -> z12\n", "")
    .replace("jmr XOR qts -> fgc\n", "")
    .replace("jfk AND vkb -> z29\n", "")
    .replace("vkb XOR jfk -> mtj\n", "")
    .replace("x37 AND y37 -> z37\n", "")
    .replace("bkj XOR fhq -> dtv\n", "")
    .replace("y33 AND x33 -> dgr\n", "")
    .replace("y33 XOR x33 -> vvm\n", "") +
  "\njmr XOR qts -> z12\nfsf OR nqs -> fgc\njfk AND vkb -> mtj\nvkb XOR jfk -> z29\nx37 AND y37 -> dtv\nbkj XOR fhq -> z37\ny33 AND x33 -> vvm\ny33 XOR x33 -> dgr";

const [valuesS, connsS] = input.split("\n\n");
const conns = connsS
  .split("\n")
  .map((v) => v.match(/^(.+?) ([A-Z]+) (.+?) -> (.+?)$/).slice(1));

// crappy visualization code
// console.log("graph LR");
// for (const c of conns.sort((a, b) => {
//   const isAStart =
//     a[0].startsWith("x") ||
//     a[0].startsWith("y") ||
//     a[2].startsWith("x") ||
//     a[2].startsWith("y");
//   const isBStart =
//     b[0].startsWith("x") ||
//     b[0].startsWith("y") ||
//     b[2].startsWith("x") ||
//     b[2].startsWith("y");
//   const isAEnd = a[3].startsWith("z");
//   const isBEnd = b[3].startsWith("z");
//   if (isAStart && !isBStart) return -1;
//   if (!isAStart && isBStart) return 1;
//   if (isAEnd && !isBEnd) return 1;
//   if (!isAEnd && isBEnd) return -1;
//   if (isAEnd && isBEnd) {
//     const aN = +a[3].slice(1);
//     const bN = +b[3].slice(1);
//     return aN - bN;
//   }
//   return 0;
// })) {
//   console.log(`  ${c[0]} --> ${c[3]}`);
//   console.log(`  ${c[2]} --> ${c[3]}`);
// }
// throw new Error("stop");

let ways = {};
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

ways = {};
let i = 0;
const aA = Array.from({ length: 45 }, () => "0");
const bA = [..."000000000000000000000000000000000100000000000"];
// const bA = Array.from({ length: 45 }, () =>
//   Math.random() > 0.9999 ? "1" : "0",
// );
const a = parseInt(aA.toReversed().join(""), 2);
const b = parseInt(bA.toReversed().join(""), 2);
const target = BigInt(a + b);
for (const letter of aA) {
  ways[`x${i.toString().padStart(2, "0")}`] = +letter;
  i++;
}
i = 0;
for (const letter of bA) {
  ways[`y${i.toString().padStart(2, "0")}`] = +letter;
  i++;
}
let output = "";
const zs = conns
  .map((c) => c[3])
  .filter((x) => x.startsWith("z"))
  .sort((a, b) => +b.slice(1) - +a.slice(1));
for (const z of zs) {
  output += evaluate(z);
  console.log(z, evaluate(z));
}
console.log(a, b, target);
const o = BigInt(parseInt(output, 2));
console.log(o.toString(2).padStart(46, "0"));
console.log(target.toString(2).padStart(46, "0"));
console.log(ways["z33"]);
// console.log(o ^ target);
// console.log((o ^ target).toString(2).padStart(45, "0"));
