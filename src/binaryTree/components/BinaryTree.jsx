import React from 'react';

import Node, { radius } from '../../shared/NodeComponent'
import BinaryTreeDataStructure, { TreeNode } from '../BinaryTreeDataStructure';

const LEFT = 'left';
const RIGHT = 'right';

const style = {
  container: {
    height: '500px',
    width: '800px'
  },
  tree: {
    height: '80%',
    width: '100%',
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
    `Click here to create a node with ${ typeof enteredValue } ${ enteredValue }`;

  return (
    <div>
      <input placeholder="Enter a value" value={ enteredValue } onChange={ onInputChange } />
      <button onClick={ onButtonClick }>{ buttonText }</button>
    </div>
  )
};

const NodeButtons = ({ nodeValues, onClick }) => {
  let interval = 100 / nodeValues.length;
  let currentX = 0 - interval + radius;

  return (
    <svg viewBox="0 0 100 100">
      {
        nodeValues.map(value => <Node onClick={ onClick } node={ new TreeNode(value) } x={ currentX += interval } y={ 10 } key={ value }/>)
      }
    </svg>
  )
};

class BinaryTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enteredValue: '',
      tree: new BinaryTreeDataStructure(),
      nodeValues: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    };

    this.changeEnteredValue = this.changeEnteredValue.bind(this);
    this.createNodeFromButton = this.createNodeFromButton.bind(this);
    this.createNodeFromInput = this.createNodeFromInput.bind(this);
  };

  changeEnteredValue(event) {
    let value = event.target.value;
    if(!isNaN(value) && value.length > 0) value = parseInt(value);
    this.setState(() => ({enteredValue: value}))
  };

  createNodeFromInput() {
    //EW
    this.state.tree.insert(new TreeNode(this.state.enteredValue));
    this.setState((prevState) => ({
      tree: prevState.tree
    }));
  }

  createNodeFromButton(value) {
    this.state.tree.insert(new TreeNode(value));
    this.setState((prevState) => ({
      nodeValues: prevState.nodeValues.filter(item => item !== value)
    }))
  };

  render() {
    return (
      <div style={ style.container }>
        <NodeInput enteredValue={ this.state.enteredValue } onInputChange={ this.changeEnteredValue } onButtonClick={ this.createNodeFromInput } />
        <div style={ style.tree }>
          <svg viewBox="0 0 100 100">
            <Subtree node={ this.state.tree.root } leftBound={ 0 } rightBound={ 100 } parentY={ -5 }/>
          </svg>
        </div>
        <NodeButtons nodeValues={ this.state.nodeValues } onClick={ this.createNodeFromButton } style={{ height: '20%', width:'100%' }}/>
      </div>
    )
  }
};

export default BinaryTree;