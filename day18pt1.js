import { readFile } from "fs/promises";
const input = await readFile("day18input.txt", "utf8");
const points = input.split("\n").slice(0, 1024);
const maxN = 70;
// const grid = Array.from({ length: 7 }, (_, y) =>
//   Array.from({ length: 7 }, (_, x) =>
//     points.includes(`${x},${y}`) ? "X" : ".",
//   ),
// );

const openSet = new Set();
const cameFrom = {};

// cost from start to n
const gScoreMap = {};
// estimated total path cost
const fScoreMap = {};

const heuristicEnd = (x, y) => {
  return Math.sqrt((x - maxN) ** 2 + (y - maxN) ** 2);
};

openSet.add("0,0");
gScoreMap["0,0"] = 0;
fScoreMap["0,0"] = heuristicEnd(0, 0);
while (openSet.size > 0) {
  let best;
  let bestScore = Infinity;
  for (const p of openSet) {
    if (fScoreMap[p] < bestScore) {
      best = p;
      bestScore = fScoreMap[p];
    }
  }

  if (best == `${maxN},${maxN}`) {
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
    console.log(path.length);
    const grid = Array.from({ length: maxN + 1 }, (_, y) =>
      Array.from({ length: maxN + 1 }, (_, x) =>
        points.includes(`${x},${y}`)
          ? "#"
          : path.includes(`${x},${y}`)
            ? "O"
            : ".",
      ),
    );
    console.log(grid.map((l) => l.join("")).join("\n"));
    break;
  }

  console.log("looking at", best);
  openSet.delete(best);

  const [x, y] = best.split(",");
  for (const neighbor of [
    `${+x - 1},${y}`,
    `${+x + 1},${y}`,
    `${x},${+y - 1}`,
    `${x},${+y + 1}`,
  ]) {
    const [x, y] = neighbor.split(",");
    if (+x < 0) continue;
    if (+y < 0) continue;
    if (+x > maxN) continue;
    if (+y > maxN) continue;
    if (points.includes(neighbor)) continue;

    // cost from start to n
    const expectedGScore = gScoreMap[best] + 1;
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
