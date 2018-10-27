import React, { Component } from 'react';
import { initCanvas } from '../lib/scripts.js';

class Canvas extends Component {
  componentDidMount() {
    setTimeout(() => initCanvas(), 15);
  }

  render() {
    return <canvas id="canvas" />;
  }
}

export default Canvas;
