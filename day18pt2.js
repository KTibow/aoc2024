import { readFile } from "fs/promises";
const input = await readFile("day18input.txt", "utf8");
const points = input.split("\n");
const maxN = 70;
// const grid = Array.from({ length: 7 }, (_, y) =>
//   Array.from({ length: 7 }, (_, x) =>
//     points.includes(`${x},${y}`) ? "X" : ".",
//   ),
// );

const doesWork = (points) => {
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
      return true;
    }

    // console.log("looking at", best);
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
  return false;
};

let min = 0; // inclusive
let max = points.length; // exclusive
while (true) {
  if (max == min + 1) {
    console.log(min, max);
    console.log(points[min], points[max]);
    console.log(doesWork(points.slice(0, min)), doesWork(points.slice(0, max)));
    break;
  }
  const midway = Math.floor((min + max) / 2);
  console.log("testing", midway);
  if (doesWork(points.slice(0, midway))) {
    min = midway;
  } else {
    max = midway;
  }
}
