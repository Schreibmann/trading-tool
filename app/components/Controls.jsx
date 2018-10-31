import React, { Component } from 'react';
import '../assets/css/switch.css';

class Controls extends Component {
  render() {
    return (
      <div className="controls-wrapper shadowed">
        <div className="switch-wrapper shadowed">
          <div className="switch-caption">
            <a className="vertical">bot</a>
          </div>
          <span className="switch">
            <span className="switch-border1">
              <span className="switch-border2">
                <input
                  id={`bot-switcher_${this.props.id} `}
                  type="checkbox"
                  checked={this.props.trading}
                  onChange={() => this.props.toggleTrading()}
                />
                <label
                  htmlFor={`bot-switcher_${this.props.id} `}
                />
                <span className="switch-top" />
                <span className="switch-shadow" />
                <span className="switch-handle" />
                <span className="switch-handle-left" />
                <span className="switch-handle-right" />
                <span className="switch-handle-top" />
                <span className="switch-handle-bottom" />
                <span className="switch-handle-base" />
                <span className="switch-led switch-led-green">
                  <span className="switch-led-border">
                    <span className="switch-led-light">
                      <span className="switch-led-glow" />
                    </span>
                  </span>
                </span>
                <span className="switch-led switch-led-red">
                  <span className="switch-led-border">
                    <span className="switch-led-light">
                      <span className="switch-led-glow" />
                    </span>
                  </span>
                </span>
              </span>
            </span>
          </span>
        </div>
        <div className="switch-wrapper shadowed">
          <div className="switch-caption">
            <a className="vertical">log</a>
          </div>
          <span className="switch">
            <span className="switch-border1">
              <span className="switch-border2">
                <input
                  id={`log-switcher_${this.props.id} `}
                  type="checkbox"
                  checked={this.props.showConsole}
                  onChange={() => this.props.toggleConsoleView()}
                />
                <label
                  htmlFor={`log-switcher_${this.props.id} `}
                />
                <span className="switch-top" />
                <span className="switch-shadow" />
                <span className="switch-handle" />
                <span className="switch-handle-left" />
                <span className="switch-handle-right" />
                <span className="switch-handle-top" />
                <span className="switch-handle-bottom" />
                <span className="switch-handle-base" />
                <span className="switch-led switch-led-green">
                  <span className="switch-led-border">
                    <span className="switch-led-light">
                      <span className="switch-led-glow" />
                    </span>
                  </span>
                </span>
                <span className="switch-led switch-led-red">
                  <span className="switch-led-border">
                    <span className="switch-led-light">
                      <span className="switch-led-glow" />
                    </span>
                  </span>
                </span>
              </span>
            </span>
          </span>
        </div>
      </div>
    );
  }
}

export default Controls;
