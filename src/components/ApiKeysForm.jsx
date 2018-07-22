import React, { Component } from "react";
import "../view/apiKeysForm.css";

class ApiKeysForm extends Component {
	setApiKeys() {
		if (this.refs.apiKey.value !== "" && this.refs.apiSecret.value !== "") {
			let keys = {
				key: this.refs.apiKey.value,
				secret: this.refs.apiSecret.value
			};

			localStorage.setItem("apiKeys", JSON.stringify(keys));
			window.location.reload();
		}

		this.props.hideApiKeys();
		this.refs.apiKey.value = "";
		this.refs.apiSecret.value = "";
	}

	render() {
		let apiKeys = JSON.parse(localStorage.getItem("apiKeys"));

		if (apiKeys !== null) {
			if (apiKeys.key === "") {
				apiKeys.key = "Put your API_KEY here...";
			}
			if (apiKeys.secret === "") {
				apiKeys.secret = "Put your API_Secret here...";
			}
		} else {
			apiKeys = {};
			apiKeys.key = "Put your API_KEY here...";
			apiKeys.secret = "Put your API_Secret here...";
		}

		return (
			<div
				id="api-keys"
				className={`api-keys-form-wrapper ${this.props.shown}`}
			>
				<div className="api-keys-input-wrapper shadowed">
					<span>
						<input
							ref="apiKey"
							id="apiKey"
							placeholder={`Api key: ${apiKeys.key}`}
						/>
					</span>
					<span>
						<input
							ref="apiSecret"
							id="apiSecret"
							placeholder={`Api secret: ${apiKeys.secret}`}
						/>
					</span>
				</div>
				<div className="api-keys-confirm-buttons">
					<button
						id="confirm"
						className="primary"
						onClick={() => this.setApiKeys()}
					>
						✔
					</button>
					<button id="clear" onClick={() => this.props.hideApiKeys()}>
						✖
					</button>
				</div>
			</div>
		);
	}
}

export default ApiKeysForm;
