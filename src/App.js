import React from 'react';
import ReactDOM from 'react-dom';

// <animate attributeType="XML" attributeName="cx" from="-100" to="120"
// dur="2s" repeatCount="indefinite"/>

import BinaryTree, { TreeNode } from './binaryTree/BinaryTree';

const style = {
  div: {
    height: '500px',
    width: '400px',
  },
  circle: {
    fill: 'white',
    stroke: 'black',
    strokeWidth: '.5'
  },
  text: {
    fontSize: 7,
  }
}

const TreeBox = ({ children }) => {
  // const center = {x:50, y:50}
  // const radius = 5
  // const node = new TreeNode(5);

  return (
    <div style={ style.div }>
      <svg viewBox="0 0 100 100">
        { children }
      </svg>
    </div>
  )
};

const getCenter = (lowerBound, upperBound) => {
  return (upperBound-lowerBound)/2 + lowerBound
}

const NodeComponent = ({ node, x }) => {
  const radius = 5;

  const y = 50;

  return (
      <svg>
        <circle cx={ x } cy={ y } r={radius} style={ style.circle }>
        </circle>
        <text x={ x } y={ y + 2.5 } textAnchor="middle" style={ style.text }>
          {node.data}
        </text>
      </svg>
  )
}

const tree = new BinaryTree();
tree.insert(new TreeNode(5));
tree.insert(new TreeNode(4));
tree.insert(new TreeNode(3));
tree.insert(new TreeNode(6));

const rootNode = tree.root;

const RecursiveNodes = ({ node, leftBound, rightBound }) => {
  const center = getCenter(leftBound, rightBound);
  const leftChildren = node.leftChild ? <RecursiveNodes node={ node.leftChild } leftBound={ leftBound } rightBound={ getCenter(leftBound, rightBound) } /> : null;
  const rightChildren = node.rightChild ? <RecursiveNodes node={ node.rightChild } leftBound={ getCenter(leftBound, rightBound) } rightBound={ rightBound } /> : null;

  if(node.leftChild) {
    return (
      <svg>
        <NodeComponent x={ center } leftBound={ leftBound } rightBound={ rightBound } node={ node }/>
        { leftChildren }
        { rightChildren }
      </svg>
    )
  }
  else return (
    <NodeComponent x={ center } leftBound={ leftBound } rightBound={ rightBound } node={ node }/>
  );
}


const App = ({ root }) => {
  return (
    <div>
    <TreeBox>
      <RecursiveNodes node={ root } leftBound={ 0 } rightBound={ 100 }/>
    </TreeBox>
    </div>
  )
};

ReactDOM.render(
  <App root={ rootNode }/>,
  document.getElementById('root')
);
