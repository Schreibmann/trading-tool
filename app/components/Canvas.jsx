import React from 'react';
import { initCanvas } from '../lib/scripts';

class Canvas extends React.PureComponent {
  componentDidMount() {
    setTimeout(() => initCanvas(), 15);
  }

  render() {
    return <canvas id="canvas" />;
  }
}

export default Canvas;
