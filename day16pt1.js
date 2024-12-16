import { readFile } from "fs/promises";
const input = await readFile("day16input.txt", "utf8");
const grid = input.split("\n").map((l) => [...l]);

const openSet = new Set();
const cameFrom = {};

// cost from start to n
const gScoreMap = {};
// estimated total path cost
const fScoreMap = {};

let start;
let finish;
for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid.length; x++) {
    if (grid[y][x] == "E") {
      grid[y][x] = ".";
      finish = [x, y];
    }
    if (grid[y][x] == "S") {
      grid[y][x] = ".";
      start = [x, y];
    }
  }
}

const heuristicEnd = (x, y) => {
  return (x - finish[0]) ** 2 + (y - finish[1]) ** 2; // fix 1: fix the coords
};

openSet.add(`${start[0]},${start[1]},E`);
gScoreMap[`${start[0]},${start[1]},E`] = 0;
fScoreMap[`${start[0]},${start[1]},E`] = heuristicEnd(start[0], start[1]);
while (openSet.size > 0) {
  let best;
  let bestScore = Infinity;
  for (const p of openSet) {
    if (fScoreMap[p] < bestScore) {
      best = p;
      bestScore = fScoreMap[p];
    }
  }

  if (+best.split(",")[0] == finish[0] && +best.split(",")[1] == finish[1]) {
    console.log("!");
    console.log(best);
    console.log(bestScore);

    // reconstruct path
    const path = [];
    let current = best;
    while (current in cameFrom) {
      path.unshift(current);
      current = cameFrom[current];
    }
    path.unshift(current);

    // verify score
    let last = path.shift();
    let score = 0;
    while (true) {
      const current = path.shift();
      if (!current) break;
      const currentD = current.split(",").at(-1);
      const lastD = last.split(",").at(-1);
      if (currentD != lastD) {
        score += 1000;
      } else {
        score += 1;
      }
      last = current;
    }
    console.log(score);
    break;
  }

  // console.log("looking at", best);
  openSet.delete(best);

  const [x, y, d] = best.split(",");
  const vector = { E: [1, 0], W: [-1, 0], N: [0, -1], S: [0, 1] }[d];
  for (const neighbor of [
    `${x},${y},E`,
    `${x},${y},W`,
    `${x},${y},N`,
    `${x},${y},S`,
    `${+x + vector[0]},${+y + vector[1]},${d}`,
  ]) {
    if (neighbor == best) continue;
    const [x, y, thisD] = neighbor.split(","); // fix 3: get data for the neighbor, not the best
    if (grid[+y][+x] == "#") continue;

    // cost from start to n
    const expectedGScore = gScoreMap[best] + (thisD == d ? 1 : 1000); // fix 2: don't double count the heuristic
    if (!(neighbor in gScoreMap) || expectedGScore < gScoreMap[neighbor]) {
      cameFrom[neighbor] = best;
      gScoreMap[neighbor] = expectedGScore;
      fScoreMap[neighbor] = expectedGScore + heuristicEnd(+x, +y);
      if (!openSet.has(neighbor)) {
        openSet.add(neighbor);
      }
    }
  }
}
