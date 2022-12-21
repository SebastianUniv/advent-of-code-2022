import path from "path";
import fs from "fs";

type Edge = {
  vertex: string;
  weight: number;
};

export class WeightedGraph {
  #vertices: Map<string, number>;
  #edges: Map<string, Edge[]>;

  constructor(vertices?: Map<string, number>, edges?: Map<string, Edge[]>) {
    this.#vertices = vertices ? vertices : new Map();
    this.#edges = edges ? edges : new Map();
  }

  addVertex(vertex: string, value: number) {
    this.#vertices.set(vertex, value);
  }

  addEdge(vertex: string, edge: Edge) {
    const edges = this.#edges.get(vertex);
    if (!edges) {
      this.#edges.set(vertex, [edge]);
      return;
    }

    this.#edges.set(vertex, [...edges, edge]);
  }

  deleteVertex(vertex: string) {
    this.#vertices.delete(vertex);
    const edges = this.#edges.get(vertex);
    this.#edges.delete(vertex);

    edges?.forEach((edge) => {
      const filtered = this.#edges
        .get(edge.vertex)
        ?.filter((n) => n.vertex !== vertex);
      this.#edges.set(edge.vertex, filtered ? filtered : []);
    });
  }

  getVertex(vertex: string) {
    const value = this.#vertices.get(vertex);

    if (value === undefined) throw Error();

    return value;
  }

  getVertices() {
    return this.#vertices.keys();
  }

  getEdges(vertex: string) {
    const edges = this.#edges.get(vertex);

    if (edges === undefined) throw Error();

    return edges;
  }

  clean() {
    for (const vertex of this.#vertices.keys()) {
      if (vertex == "AA") continue;
      if (this.#vertices.get(vertex)! !== 0) continue;

      const neighbours = this.#edges.get(vertex)!;

      for (const neigbour of neighbours) {
        const filtered = this.#edges
          .get(neigbour.vertex)!
          .filter((n) => n.vertex != vertex);

        neighbours
          .filter((n) => n.vertex != neigbour.vertex)
          .map((n) => {
            const existing = filtered.find((v) => v.vertex === n.vertex);
            if (existing && existing.weight <= n.weight + 1) return;
            if (existing && existing.weight > n.weight + 1) {
              filtered.splice(filtered.indexOf(existing), 1);
            }
            filtered.push({ vertex: n.vertex, weight: n.weight + 1 });
          });

        this.#edges.set(neigbour.vertex, filtered);
      }
      this.#edges.delete(vertex);
      this.#vertices.delete(vertex);
    }
  }

  copy() {
    return new WeightedGraph(new Map(this.#vertices), new Map(this.#edges));
  }
}

export function parseInput(filePath: string) {
  const graph = new WeightedGraph();
  const data = fs.readFileSync(path.join(__dirname, `./${filePath}`), "utf-8");

  const lines = data.split(/\r?\n/);

  lines.forEach((line) => {
    const [flowSegment, tunnelSegment] = line.split(";");
    const flowWords = flowSegment.split(" ");
    const valve = flowWords[1];
    const rate = +flowWords[flowWords.length - 1].split("=")[1];

    const [sentence, ...neighbours] = tunnelSegment.split(", ");
    let firstNeighbour = sentence.split(" ");
    neighbours.push(firstNeighbour[firstNeighbour.length - 1]);

    graph.addVertex(valve, rate);

    neighbours.forEach((neighbour) => {
      graph.addEdge(valve, { vertex: neighbour, weight: 1 });
    });
  });

  graph.clean();

  return graph;
}
