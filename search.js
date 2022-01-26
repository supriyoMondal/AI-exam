const Node = require('./Node');
const Graph = require('./Graph');

const printValues = (stack = []) => {
  if (stack.length === 0) return '[]';
  let res = '';
  stack.forEach((item) => {
    if (!res) {
      res = `${item.index}`;
    } else {
      res = `${res},${item.index}`;
    }
  });
  return `[${res}]`;
};

const doDFS = (graph = new Graph(), index = 0) => {
  console.log('STARTING DFS');
  let globalTime = 0;
  let solved = false;
  let list = graph.list;
  let stack = [];
  let node = list[index];

  const dfs = (
    node = new Node({ index: 1 }),
    list = [],
    graph = new Graph()
  ) => {
    if (node.color !== 0) {
      return;
    }

    stack.push(node);
    console.log(`stack -> ${printValues(stack)}`);
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
      const currentNode = list[item];
      if (currentNode.color === 0) {
        currentNode.setParentNode(node);
        dfs(currentNode, list, graph);
      }
      if (solved) {
        return;
      }
    });
    node.setEndTime(++globalTime);
    node.setColor(2);
    stack.pop();
    console.log(`stack -> ${printValues(stack)}`);
  };

  if (node.color === 0) {
    dfs(node, list, graph);
  }
};

module.exports = { doDFS, printValues };
