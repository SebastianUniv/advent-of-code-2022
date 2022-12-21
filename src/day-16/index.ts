import { WeightedGraph, parseInput } from "./data/parse";

function _maxPathScore(
  vertex: string,
  score: number,
  minutes: number,
  graph: WeightedGraph
): number {
  if (minutes < 0) return score;
  if ([...graph.getVertices()].length === 1) return score * minutes;

  const edges = graph.getEdges(vertex);

  const prunedGraph = graph.copy();
  prunedGraph.deleteVertex(vertex);

  let best = 0;
  let timeSpent = 0;

  edges.forEach((edge) => {
    const found = _maxPathScore(
      edge.vertex,
      score + graph.getVertex(vertex),
      minutes - edge.weight,
      prunedGraph
    );

    if (found > best) {
      best = found;
      timeSpent = edge.weight;
    }
  });

  return (score + graph.getVertex(vertex)) * timeSpent + best;
}

function _partOne(graph: WeightedGraph) {
  return _maxPathScore("AA", 0, 30, graph);
}

function _partTwo() {}

export function solve(filePath: string = "input.txt") {
  const graph = parseInput(filePath);

  return [_partOne(graph), _partTwo()];
}
