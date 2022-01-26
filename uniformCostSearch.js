const Graph = require('./Graph');
const PriorityQueue = require('./priorityQueue');
const { printValues } = require('./search');

const uniformCostSearch = (graph = new Graph(), startIndex) => {
  let globalTime = 0;
  let solved = false;
  let list = graph.list;
  let queue = new PriorityQueue((a, b) => a.pathCost - b.pathCost);

  let node = list[startIndex];
  queue.push(node);
  node.setColor(1);
  node.setStartTime(++globalTime);

  if (node.value === graph.goal) {
    solved = true;
    node.setEndTime(++globalTime);
    node.setColor(2);
    graph.setSolutionNode(node);
    return;
  }

  while (!queue.isEmpty()) {
    let currentNode = queue.pop();

    if (currentNode.value === graph.goal) {
      solved = true;
      currentNode.setEndTime(++globalTime);
      currentNode.setColor(2);
      graph.setSolutionNode(currentNode);
      return;
    }
    let count = -1;

    currentNode.adjacentNodes.forEach((nodeIndex) => {
      count++;
      let _node = list[nodeIndex];
      let edgeValue = currentNode.edgeValues[count];
      let pathCost = currentNode.pathCost + edgeValue;
      if (_node.color === 0) {
        _node.setColor(1);
        _node.setStartTime(++globalTime);
        _node.setParentNode(currentNode);
        _node.setPathCost(pathCost);
        queue.push(_node);

        // console.log(`stack -> ${printValues(queue)}`);
      }
      if (_node.pathCost > pathCost) {
        _node.setPathCost(pathCost);
        _node.setParentNode(currentNode);
      }
    });
    currentNode.setEndTime(++globalTime);
    currentNode.setColor(2);
  }
};

const vertices = [1, 10, 2, 3];
const graph = new Graph({ vertices: [...new Set(vertices)], undirected: true });
graph.setGoal(10);

graph.addEdge(0, 1, 4);
graph.addEdge(0, 3, 1);
graph.addEdge(3, 2, 1);
graph.addEdge(2, 1, 1);

uniformCostSearch(graph, 0);
graph.showSolutionPath();
