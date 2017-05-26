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
    if(this.root === null) this.root = node;

    else if(node.data < parentNode.data) {
      if(parentNode.leftChild === null) parentNode.leftChild = node;
      else this.insert(node, parentNode.leftChild);
    } else {
      if(parentNode.rightChild === null) parentNode.rightChild = node;
      else this.insert(node, parentNode.rightChild);
    }
  };
}

// export default BinaryTree;
