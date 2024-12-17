import { readFile } from "fs/promises";
const input = await readFile("day17input.txt", "utf8");
const [, strA, strB, strC, strProgram] = input.match(
  /Register A: (\d+)\nRegister B: (\d+)\nRegister C: (\d+)\n\nProgram: (.+)/,
);
let a = +strA;
let b = +strB;
let c = +strC;
const program = strProgram.split(",").map((x) => +x);

const outputs = [];
for (let i = 0; i < program.length; i += 2) {
  const opcode = program[i];
  const operand = program[i + 1];
  const data = operand == 6 ? c : operand == 5 ? b : operand == 4 ? a : operand;
  if (opcode == 0) {
    a /= 2 ** data;
    a = Math.floor(a);
  } else if (opcode == 1) {
    b = b ^ operand;
  } else if (opcode == 2) {
    b = data % 8;
  } else if (opcode == 3) {
    if (a != 0) {
      i = operand;
      i -= 2;
    }
  } else if (opcode == 4) {
    b = b ^ c;
  } else if (opcode == 5) {
    outputs.push(data % 8);
  } else if (opcode == 6) {
    b = a / 2 ** data;
    b = Math.floor(b);
  } else if (opcode == 7) {
    c = a / 2 ** data;
    c = Math.floor(c);
  }
}
console.log("===");
console.log(outputs.join(","));
