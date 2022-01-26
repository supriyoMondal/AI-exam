const Graph = require('./Graph');
const { doDFS } = require('./search');

const vertices = [2, 3, 5, 6, 7];
const graph = new Graph({ vertices, undirected: true });
graph.setGoal(8);
graph.addEdge(0, 1);
graph.addEdge(0, 2);
graph.addEdge(2, 3);
graph.addEdge(3, 4);

console.log('Start dfs');
doDFS(graph);
graph.showSolutionPath();
