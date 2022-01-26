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

    node.adjacentNodes.forEach((nodeIndex) => {
      const currentNode = list[nodeIndex];
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

const doBFS = (graph = new Graph(), index = 0) => {
  console.log('STARTING BFS');
  let globalTime = 0;
  let solved = false;
  let list = graph.list;
  let queue = [];
  let node = list[index];

  queue.push(node);
  console.log(`queue -> ${printValues(queue)}`);
  node.setColor(1);
  node.setStartTime(++globalTime);
  if (node.value === graph.goal) {
    console.log('NODE FOUND');
    solved = true;
    node.setEndTime(++globalTime);
    node.setColor(2);
    graph.setSolutionNode(node);
    return;
  }
  while (queue.length) {
    const currentNode = queue.shift();
    console.log(`queue -> ${printValues(queue)}`);
    currentNode.adjacentNodes.forEach((nodeIndex) => {
      let _node = list[nodeIndex];
      if (_node.color === 0) {
        _node.setColor(1);
        _node.setStartTime(++globalTime);
        _node.setParentNode(currentNode);
        queue.push(_node);
        console.log(`queue -> ${printValues(queue)}`);
        if (_node.value === graph.goal) {
          console.log('NODE FOUND');
          solved = true;
          _node.setEndTime(++globalTime);
          _node.setColor(2);
          graph.setSolutionNode(_node);
          return;
        }
      }
    });
    node.setEndTime(++globalTime);
    node.setColor(2);
  }
};

const doDLS = (graph = new Graph(), depth = 0, index = 0) => {
  let globalTime = 0;
  let solved = false;
  let list = graph.list;
  let stack = [];
  let node = list[index];

  const dls = (
    node = new Node({ index: 1 }),
    list = [],
    currentDepth,
    depthLimit
  ) => {
    currentDepth++;
    if (node.color !== 0) {
      return;
    }

    if (currentDepth > depthLimit) {
      node.setColor(2);
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

    node.adjacentNodes.forEach((nodeIndex) => {
      const currentNode = list[nodeIndex];
      if (currentNode.color === 0) {
        currentNode.setParentNode(node);
        dls(currentNode, list, currentDepth, depthLimit);
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
    dls(node, list, 0, depth);
  }
};

const doIDS = (graph = new Graph(), startIndex = 0) => {
  let list = graph.list;
  for (let i = 0; i < list.length; i++) {
    console.log(`Iteration ${i}`);
    doDLS(graph, i, startIndex);
    if (graph.solutionNode) {
      graph.showSolutionPath();
      return;
    }
    graph.reinitializeGraph();
  }
};

const doIBS = (graph = new Graph(), startIndex = 0) => {
  let globalTime = 0;
  let solved = false;
  let list = graph.list;
  let stack = [];

  const ibs = (node, list = [], breadthLimit) => {
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
      graph.solutionNode = node;
      return;
    }
    let count = 0;
    for (let i = 0; i < list.length; i++) {
      const adjNode = list[i];

      if (adjNode.color === 0) {
        count++;
      }
      if (count > breadthLimit) break;
      if (adjNode.color === 0) {
        adjNode.setParentNode(node);
        ibs(adjNode, list, breadthLimit);
      }
      if (solved) return;
    }
    node.setEndTime(++globalTime);
    node.setColor(2);
    stack.pop();
    console.log(`stack -> ${printValues(stack)}`);
  };

  for (let i = 0; i < list.length; i++) {
    console.log(`Iteration ${i}`);
    const currentNode = list[i];
    if (currentNode.color === 0) {
      ibs(currentNode, list, i);
    }
    if (!graph.solutionNode) {
      graph.reinitializeGraph();
    } else {
      graph.showSolutionPath();
      return;
    }
  }
};

module.exports = { doDFS, printValues, doBFS, doDLS, doIDS, doIBS };
