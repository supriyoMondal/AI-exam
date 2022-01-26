const Node = require('./Node');

class Graph {
  list = [];
  solutionPath = [];
  undirected;
  searchFlag;
  solutionNode;
  goal;
  constructor({ vertices = [], undirected = true }) {
    this.undirected = undirected;
    vertices.forEach((item, index) => {
      this.list.push(new Node({ index, value: item }));
    });
  }

  setGoal(value) {
    this.goal = value;
  }
  setSolutionNode(node) {
    this.solutionNode = node;
  }
  addEdge(start, end) {
    if (start >= this.list.length || end >= this.list.length) {
      console.error('Node does not exists');
      return;
    }
    let startNode = this.list[start];
    let endNode = this.list[start];
    startNode.addAdjacentNode(end);
    startNode.addEdgeValue(endNode.value);
    if (this.undirected) {
      endNode.addAdjacentNode(start);
      endNode.addEdgeValue(startNode.value);
    }
  }
  showSolutionPath() {
    let startNode = this.solutionNode;
    let path = '';
    while (startNode) {
      if (!path) {
        path = `${startNode.index}`;
      } else {
        path = `${path} ---> ${startNode.index}`;
      }
      startNode = startNode.parentNode;
    }
    console.log(path);
  }
}

module.exports = Graph;
