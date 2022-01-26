const Node = require('./Node');
const { printValues } = require('./search');

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
  addEdge(start, end, edgeValue = 1) {
    if (start >= this.list.length || end >= this.list.length) {
      console.error(`One of the vertices does not exists ${start} or ${end}`);
      return;
    }
    let startNode = this.list[start];
    let endNode = this.list[end];

    startNode.addAdjacentNode(end);
    startNode.addEdgeValue(edgeValue);
    if (this.undirected) {
      endNode.addAdjacentNode(start);
      endNode.addEdgeValue(edgeValue);
    }
  }
  showSolutionPath() {
    let startNode = this.solutionNode;

    let path = '';
    while (startNode) {
      if (!path) {
        path = `${startNode.index}`;
      } else {
        path = `${path} <--- ${startNode.index}`;
      }
      startNode = startNode.parentNode;
    }
    if (path) {
      console.log(`Solution : ${path}`);
      return;
    }
    console.log('Node not found');
  }
  reinitializeGraph() {
    this.solutionNode = null;
    this.list.forEach((item) => {
      item.setColor(0);
      item.setEndTime(0);
      item.setStartTime(0);
    });
  }
}

module.exports = Graph;
