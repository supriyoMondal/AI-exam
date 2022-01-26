const Graph = require('./Graph');
const { doDFS, doBFS, doDLS, doIDS, doIBS } = require('./search');

const vertices = [0, 1, 2, 3, 4];
const graph = new Graph({ vertices: [...new Set(vertices)], undirected: true });
graph.setGoal(4);
graph.addEdge(0, 3);
graph.addEdge(0, 1);
graph.addEdge(0, 2);
graph.addEdge(1, 2);
graph.addEdge(2, 4);

// doBFS(graph, 0);
// graph.showSolutionPath();

// graph.reinitializeGraph();
// doDLS(graph, 3, 1);
// graph.showSolutionPath();

// graph.reinitializeGraph();
// doIDS(graph, 3, 1);
// graph.showSolutionPath();

// graph.reinitializeGraph();
// doDFS(graph, 0);
// graph.showSolutionPath();
