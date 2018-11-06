import React from 'react';
import Canvas from './Canvas';
import Logo from './logo';

class Background extends React.PureComponent {
  render() {
    const {
      children,
    } = this.props;

    return (
      <React.Fragment>
        <div className="container">
          <Canvas />
          <Logo />
          {children}
        </div>
      </React.Fragment>
    );
  }
}

export default Background;
