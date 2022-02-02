const Graph = require('./Graph');
const { doDFS, doBFS, doDLS, doIDS } = require('./search');

const vertices = [1, 6, 2, 7, 3, 8, 5];
const graph = new Graph({ vertices: [...new Set(vertices)], undirected: true });
graph.setGoal(2);
graph.addEdge(0, 1);
graph.addEdge(0, 2);
graph.addEdge(1, 3);
graph.addEdge(1, 4);
graph.addEdge(1, 5);
graph.addEdge(5, 6);

doDFS(graph, 0);
graph.printVisited();
// graph.showSolutionPath();

// doBFS(graph, 0);
// graph.showSolutionPath();

// doDLS(graph, 3, 1);
// graph.showSolutionPath();

// doIDS(graph, 3, 1);
// graph.showSolutionPath();
