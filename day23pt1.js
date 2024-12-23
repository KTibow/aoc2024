import { readFile } from "node:fs/promises";
const input = await readFile("day23input.txt", "utf8");
let list = input.split("\n");

list = list.map((l) => l.split("-").sort().join("-"));
const connections = list.map((l) => l.split("-"));
const tComputers = new Set();
for (const c of connections) {
  if (c[0].startsWith("t")) {
    tComputers.add(c[0]);
  }
  if (c[1].startsWith("t")) {
    tComputers.add(c[1]);
  }
}

const allGroups = new Set();
for (const c of tComputers) {
  const connectedTo = new Set();
  for (const connection of connections) {
    if (connection.includes(c)) {
      connectedTo.add(connection.find((x) => x != c));
    }
  }
  const connectedArr = [...connectedTo];

  for (let i = 0; i < connectedArr.length; i++) {
    for (let j = i + 1; j < connectedArr.length; j++) {
      const conn = [connectedArr[i], connectedArr[j]].sort().join("-");
      if (list.includes(conn)) {
        const fullConn = [c, connectedArr[i], connectedArr[j]].sort().join("-");
        allGroups.add(fullConn);
      }
    }
  }
}
console.log(allGroups.size);
