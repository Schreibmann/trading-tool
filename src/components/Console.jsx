import React, { Component } from "react";
import "../view/console.css";

class Console extends Component {
	render() {
		return (
			<div className={`console ${this.props.visibility}`}>
				<div id="console" className="scrollable">
					{this.props.text}
				</div>
			</div>
		);
	}
}

export default Console;
