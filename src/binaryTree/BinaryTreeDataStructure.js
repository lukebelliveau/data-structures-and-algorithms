export class TreeNode {
  constructor(data) {
    this.leftChild = null;
    this.rightChild = null;
    this.data = data;
  }

  setLeftChild(node) {
    this.leftChild = node;
  }

  setRightChild(node) {
    this.rightChild = node;
  }
};

export default class BinaryTree {
  constructor() {
    this.root = null;
  };

  insert(node, parentNode = this.root) {
    if(this.root === null) {
      this.root = node;
      return;
    }

    if(node.data === parentNode.data) return;
    else if(node.data < parentNode.data) {
      parentNode.leftChild === null ?
        parentNode.leftChild = node :
        this.insert(node, parentNode.leftChild);
    } else {
      parentNode.rightChild === null ?
        parentNode.rightChild = node :
        this.insert(node, parentNode.rightChild);
    }
  };

  inOrder(node, callback) {
    if(node.leftChild) this.inOrder(node.leftChild, callback);

    callback(node);

    if(node.rightChild) this.inOrder(node.rightChild, callback);
  }

  getInOrderString() {
    let traversalString = '';

    this.inOrder(this.root, (node) => {
      traversalString += node.data + ' ';
    });

    return traversalString.slice(0, traversalString.length - 1);
  }
};