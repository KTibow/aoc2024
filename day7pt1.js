import { readFile } from "fs/promises";
const input = await readFile("day7input.txt", "utf8");
const lines = input.split("\n").map((l) => ({
  result: +l.split(": ")[0],
  nums: l
    .split(": ")[1]
    .split(" ")
    .map((n) => +n),
}));

let sum = 0;
for (const line of lines) {
  const runThrough = (nums, val) => {
    if (nums.length == 0) {
      return line.result == val;
    }
    return (
      runThrough(nums.slice(1), val + nums[0]) ||
      runThrough(nums.slice(1), val * nums[0])
    );
  };
  if (runThrough(line.nums.slice(1), nums[0])) sum += line.result;
}
console.log(sum);
