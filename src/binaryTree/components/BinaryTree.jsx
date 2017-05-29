import React from 'react';

import Node, { radius } from '../../shared/NodeComponent'
import BinaryTreeDataStructure, { TreeNode } from '../BinaryTreeDataStructure';

const LEFT = 'left';
const RIGHT = 'right';

const style = {
  div: {
    height: '400px',
    width: '400px',
  },
};

const getCenter = (lowerBound, upperBound) => {
  return (upperBound-lowerBound)/2 + lowerBound
};

const getNextYPosition = (parentCenter) => (parentCenter ? parentCenter.y : 0) + (radius * 2);

const RecursiveChild = ({ node, parentX, parentY, childLeftbound, childRightbound, direction }) => {
  if (!node) return null;

  const x1 = (direction === LEFT ?
    parentX - radius :
    parentX + radius
  );

  const x2 = direction === LEFT ? getCenter(childLeftbound, parentX) : getCenter(parentX, childRightbound);
  const y2 = getNextYPosition({ x: parentX, y: parentY });

  return (
    <svg>
      <line x1={ x1 } y1={ parentY } x2={ x2 } y2={ y2 } strokeWidth="1" stroke="black" key="line" />
      <Subtree node={ node } leftBound={ childLeftbound } rightBound={ childRightbound } parentCenter={{ x: parentX, y: parentY }}/>
    </svg>
  )
};

const Subtree = ({ node, leftBound, rightBound, parentCenter }) => {
  if (!node) return null;
  const x = getCenter(leftBound, rightBound);
  const y = getNextYPosition(parentCenter);

  return (
    <svg>
      <Node x={ x } y={ y } node={ node }/>
      <RecursiveChild
        node={ node.leftChild }
        parentX={ x } parentY={ y }
        childLeftbound={ leftBound }
        childRightbound={ x }
        direction={ LEFT }
      />
      <RecursiveChild
        node={ node.rightChild }
        parentX={ x } parentY={ y }
        childLeftbound={ x }
        childRightbound={ rightBound }
        direction={ RIGHT }
      />
    </svg>
  )
};

const NodeInput = ({ enteredValue, onInputChange, onButtonClick }) => {
  const buttonText = enteredValue === '' ?
    `Enter some text to create a node!` :
    `Click here to create a node with ${ typeof enteredValue } ${ enteredValue }`

  return (
    <div>
      <input placeholder="Enter a value" value={ enteredValue } onChange={ onInputChange } />
      <button onClick={ onButtonClick }>{ buttonText }</button>
    </div>
  )
};

class BinaryTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enteredValue: '',
      tree: new BinaryTreeDataStructure(),
    };

    this.changeEnteredValue = this.changeEnteredValue.bind(this);
    this.createNode = this.createNode.bind(this);
  };

  changeEnteredValue(event) {
    let value = event.target.value;
    if(!isNaN(value) && value.length > 0) value = parseInt(value);
    this.setState(() => ({enteredValue: value}))
  };

  createNode() {
    this.state.tree.insert(new TreeNode(this.state.enteredValue));
    this.setState(() => ({enteredValue: ''}))
  };

  render() {
    return (
      <div style={ style.div }>
        <svg viewBox="0 0 100 100">
          <Subtree node={ this.state.tree.root } leftBound={ 0 } rightBound={ 100 } parentY={ -5 }/>
        </svg>
        <NodeInput enteredValue={ this.state.enteredValue } onInputChange={ this.changeEnteredValue } onButtonClick={ this.createNode }/>
      </div>
    )
  }
};

export default BinaryTree;