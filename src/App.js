import React from 'react';
import ReactDOM from 'react-dom';

import BinaryTree, { TreeNode } from './binaryTree/BinaryTree';

const style = {
  div: {
    height: '400px',
    width: '400px',
  },
  circle: {
    fill: 'white',
    stroke: 'black',
    strokeWidth: '.5'
  },
  text: {
    fontSize: 5,
  }
}

const radius = 3;
const mockY = 50;

const getCenter = (lowerBound, upperBound) => {
  return (upperBound-lowerBound)/2 + lowerBound
}

const NodeComponent = ({ node, x, y }) => (
    <svg>
      <circle cx={ x } cy={ y } r={radius} style={ style.circle }>
      </circle>
      <text x={ x } y={ y + 2 } textAnchor="middle" style={ style.text }>
        {node.data}
      </text>
    </svg>
);

const getChildY = (parentCenter) => (parentCenter ? parentCenter.y : 0) + (radius * 4);

const RecursiveNodes = ({ node, leftBound, rightBound, parentCenter }) => {
  if (!node) return null;

  const x = getCenter(leftBound, rightBound);
  const y = getChildY(parentCenter);
  const leftChildren = node.leftChild ?
    [
      <line x1={ x - radius } y1={ y } x2={ getCenter(leftBound, x) } y2={ getChildY({x, y}) } stroke-width="1" stroke="black"/>,
      <RecursiveNodes node={ node.leftChild } leftBound={ leftBound } rightBound={ x } parentCenter={{ x, y }}  />,
    ]
    : null;
  const rightChildren = node.rightChild ?
    [
      <line x1={ x + radius } y1={ y } x2={ getCenter(x, rightBound) } y2={ getChildY({x, y}) } stroke-width="1" stroke="black"/>,
      <RecursiveNodes node={ node.rightChild } leftBound={ x } rightBound={ rightBound } parentCenter={{ x, y }} />
    ]
    : null;

  return (
    <svg>
      <NodeComponent x={ x } y={ y } leftBound={ leftBound } rightBound={ rightBound } node={ node }/>
      { leftChildren }
      { rightChildren }
    </svg>
  )
}

const NodeMaker = ({ enteredValue, onInputChange, onButtonClick }) => {
  const buttonText = enteredValue === '' ?
                      `Enter some text to create a node!` :
                      `Click here to create a node with ${ typeof enteredValue } ${ enteredValue }`

  return (
    <div>
      <input placeholder="Enter a value" value={ enteredValue } onChange={ onInputChange }></input>
      <button onClick={ onButtonClick }>{ buttonText }</button>
    </div>
  )
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enteredValue: '',
      tree: new BinaryTree(),
    }

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
  }

  render() {
    return (
      <div style={ style.div }>
        <svg viewBox="0 0 100 100">
          <RecursiveNodes node={ this.state.tree.root } leftBound={ 0 } rightBound={ 100 } parentY={ -5 }/>
        </svg>
        <NodeMaker enteredValue={ this.state.enteredValue } onInputChange={ this.changeEnteredValue } onButtonClick={ this.createNode }/>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
