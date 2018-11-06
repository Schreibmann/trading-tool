import React from 'react';
import Background from '../components/Background';

// eslint-disable-next-line function-paren-newline
export default Target => (
  class extends React.PureComponent {
      static displayName = `withBackground(${Target.displayName || Target.name})`;

      render() {
        return (
          <Background>
            <Target {...this.props} />
          </Background>
        );
      }
  }
);
