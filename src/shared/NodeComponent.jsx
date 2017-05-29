import React from 'react';

const style = {
  circle: {
    fill: 'white',
    stroke: 'black',
    strokeWidth: '.5'
  },
  text: {
    fontSize: 5,
  },
};

export const radius = 5;

const NodeComponent = ({ node, x, y, onClick }) => (
  <svg onClick={ () => onClick(node.data) }>
    <circle cx={ x } cy={ y } r={radius} style={ style.circle }>
    </circle>
    <text x={ x } y={ y + 2 } textAnchor="middle" style={ style.text }>
      {node.data}
    </text>
  </svg>
);

export default NodeComponent;