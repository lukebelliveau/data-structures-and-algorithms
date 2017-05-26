import { expect } from 'chai';

import TreeNode from '../../src/binaryTree/TreeNode';

describe('TreeNode', () => {
  it('should have a null left child', () => {
    const node = new TreeNode();

    console.log(node);

    expect(node.leftChild).to.be.null;
  })
});
