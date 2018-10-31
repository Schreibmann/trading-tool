import React from 'react';
import '../assets/css/console.css';

const Console = (props) => {
  const { visibility, text } = props;
  return (
    <div className={`console ${visibility}`}>
      <div id="console" className="scrollable">
        {text}
      </div>
    </div>
  );
};

export default Console;
