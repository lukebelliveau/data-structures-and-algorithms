import { expect } from 'chai';

import BinaryTree, { TreeNode } from '../../src/binaryTree/BinaryTree';

describe('TreeNode', () => {
  it('should instantiate with data and null children', () => {
    const node = new TreeNode(1);

    expect(node.leftChild).to.be.null;
    expect(node.rightChild).to.be.null;
    expect(node.data).to.equal(1);
  });

  it('should add a left child', () => {
    const parent = new TreeNode('parent');
    const leftNode = new TreeNode('left');

    parent.setLeftChild(leftNode);

    expect(parent.leftChild).to.eql(leftNode);
  });

  it('should add a right child', () => {
    const parent = new TreeNode('parent');
    const rightNode = new TreeNode('right');

    parent.setRightChild(rightNode);

    expect(parent.rightChild).to.eql(rightNode);
  });
});

describe('BinaryTree', () => {
  let tree;
  beforeEach(() => {
    tree = new BinaryTree();
  })

  describe('insertion', () => {
    it('should insert at the root if tree is empty', () => {
      const node = new TreeNode('parent');

      tree.insert(node);

      expect(tree.root).to.eql(node);
    });

    it('should insert lesser children to the left of the parent', () => {
      const parentNode = new TreeNode(2);
      const leftNode = new TreeNode(1);

      tree.insert(parentNode);
      tree.insert(leftNode);

      expect(parentNode.leftChild).to.eql(leftNode);
    });

    it('should insert greater children to the right of the parent', () => {
      const parentNode = new TreeNode(1);
      const rightNode = new TreeNode(2);

      tree.insert(parentNode);
      tree.insert(rightNode);

      expect(parentNode.rightChild).to.eql(rightNode);
    });

    it('should recursively add children', () => {
      const threeNode = new TreeNode(3);
      const oneNode = new TreeNode(1);
      const twoNode = new TreeNode(2);

      tree.insert(threeNode);
      tree.insert(oneNode);
      tree.insert(twoNode);

      expect(oneNode.rightChild).to.eql(twoNode);
    });
  });

  describe('inorder traversal', () => {
    /*
              4
            /   \
           2     6
          / \   / \
         1  3  5  7

   inorder: 1 2 3 4 5 6 7
    */

    it('should return a string with the correct order', () => {
      const valuesToInsert = [4, 2, 1, 3, 6, 5, 7];

      valuesToInsert.forEach(value => {
        tree.insert(new TreeNode(value));
      })

      const inOrder = tree.getInOrderString();

      expect(inOrder).to.equal('1 2 3 4 5 6 7');
    })

  })
});
