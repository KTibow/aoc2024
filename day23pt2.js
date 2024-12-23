import { readFile } from "node:fs/promises";
const input = await readFile("day23input.txt", "utf8");
let list = input.split("\n");

list = list.map((l) => l.split("-").sort().join("-"));
const computers = new Set();
const graph = {};
for (const connection of list.map((l) => l.split("-"))) {
  computers.add(connection[0]);
  computers.add(connection[1]);
  graph[connection[0]] ||= [];
  graph[connection[1]] ||= [];
  graph[connection[0]].push(connection[1]);
  graph[connection[1]].push(connection[0]);
}

const evaluateOption = (vertexes) => {
  const couldConnectTo = [...computers].filter(
    (c) => !vertexes.includes(c) && vertexes.every((v) => graph[v].includes(c)),
  );
  const avgConnected =
    couldConnectTo
      .map((c) => graph[c].filter((v) => couldConnectTo.includes(v)).length)
      .reduce((a, v) => a + v, 0) / couldConnectTo.length;
  return avgConnected;
};
const searchWith = (currentVertexes) => {
  const couldConnectTo = [...computers].filter(
    (c) =>
      !currentVertexes.includes(c) &&
      currentVertexes.every((v) => graph[v].includes(c)),
  );
  if (couldConnectTo.length == 0) {
    return currentVertexes;
  }
  const goingFor = couldConnectTo.sort(
    (a, b) =>
      evaluateOption([...currentVertexes, b]) -
      evaluateOption([...currentVertexes, a]),
  );
  const result = searchWith([...currentVertexes, goingFor[0]]);
  return result;
};

const start = [...computers].sort(
  (a, b) => evaluateOption([b]) - evaluateOption([a]),
)[0];
console.log(searchWith([start]).sort().join(","));
