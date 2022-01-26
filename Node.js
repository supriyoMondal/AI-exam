class Node {
  index;
  value;
  adjacentNodes = [];
  color = 0;
  startTime = 0;
  endTime = 0;
  parentNode;
  edgeValues = [];
  constructor({ index = 0, value = 0 }) {
    this.index = index;
    this.value = value;
  }

  getValue() {
    return `${this.value}`;
  }

  setStartTime(time) {
    this.startTime = time;
  }
  setEndTime(time) {
    this.endTime = time;
  }
  setColor(color) {
    this.color = color;
  }
  setParentNode(node) {
    this.parentNode = node;
  }
  addAdjacentNode(index) {
    if (!this.adjacentNodes.includes(index)) {
      this.adjacentNodes.push(index);
    }
  }
  addEdgeValue(value) {
    this.edgeValues.push(value);
  }
}

module.exports = Node;
