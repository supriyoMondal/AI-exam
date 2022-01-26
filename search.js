const Node = require('./Node');
const Graph = require('./Graph');

const doDFS = (graph = new Graph(), index) => {
  let globalTime = 0;
  let solved = false;
  let list = graph.list;
  let stack = [];
  let node = list[0];

  const dfs = (
    node = new Node({ index: 1 }),
    list = [],
    graph = new Graph()
  ) => {
    if (node.color !== 0) {
      return;
    }
    stack.push(node);
    console.log({ 'Current stack => ': stack });
    node.setStartTime(++globalTime);
    node.setColor(1);
    if (node.value === graph.goal) {
      solved = true;
      node.setEndTime(++globalTime);
      node.setColor(2);
      graph.setSolutionNode(node);
      return;
    }
    node.adjacentNodes.forEach((item) => {
      if (item.color === 0) {
        item.setParentNode(node);
        dfs(item, list, graph);
      }
      if (solved) {
        return;
      }
    });
    node.setEndTime(++globalTime);
    node.setColor(2);
    stack.pop();
    console.log({ 'Current stack => ': stack });
  };

  if (node.color === 0) {
    dfs(node, list, graph);
  }
};

module.exports = { doDFS };
