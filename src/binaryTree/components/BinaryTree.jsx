import React from 'react';

import Node, { radius } from '../../shared/NodeComponent'
import BinaryTreeDataStructure, { TreeNode } from '../BinaryTreeDataStructure';

const style = {
  div: {
    height: '400px',
    width: '400px',
  },
};

const getCenter = (lowerBound, upperBound) => {
  return (upperBound-lowerBound)/2 + lowerBound
};

const getNextYPosition = (parentCenter) => (parentCenter ? parentCenter.y : 0) + (radius * 4);

const RecursiveNodes = ({ node, leftBound, rightBound, parentCenter }) => {
  if (!node) return null;

  const x = getCenter(leftBound, rightBound);
  const y = getNextYPosition(parentCenter);
  const leftChildren = node.leftChild ?
    [
      <line x1={ x - radius } y1={ y } x2={ getCenter(leftBound, x) } y2={ getNextYPosition({x, y}) } strokeWidth="1" stroke="black" key="line" />,
      <RecursiveNodes node={ node.leftChild } leftBound={ leftBound } rightBound={ x } parentCenter={{ x, y }} key={ node.data } />,
    ]
    : null;
  const rightChildren = node.rightChild ?
    [
      <line x1={ x + radius } y1={ y } x2={ getCenter(x, rightBound) } y2={ getNextYPosition({x, y}) } strokeWidth="1" stroke="black" key="line" />,
      <RecursiveNodes node={ node.rightChild } leftBound={ x } rightBound={ rightBound } parentCenter={{ x, y }} key={ node.data } />
    ]
    : null;

  return (
    <svg>
      <Node x={ x } y={ y } leftBound={ leftBound } rightBound={ rightBound } node={ node }/>
      { leftChildren }
      { rightChildren }
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
          <RecursiveNodes node={ this.state.tree.root } leftBound={ 0 } rightBound={ 100 } parentY={ -5 }/>
        </svg>
        <NodeInput enteredValue={ this.state.enteredValue } onInputChange={ this.changeEnteredValue } onButtonClick={ this.createNode }/>
      </div>
    )
  }
}

export default BinaryTree;