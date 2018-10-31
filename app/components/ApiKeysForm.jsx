import React from 'react';
import { connect } from 'react-redux';
import { hideApiKeysForm } from '../actions/apiKeysFormActions';
import '../assets/css/apiKeysForm.css';

class ApiKeysForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.apiKey = React.createRef();
    this.apiSecret = React.createRef();
  }

  setApiKeys() {
    const { hideApiKeysForm } = this.props;

    if (this.apiKey.current.value !== '' && this.apiSecret.current.value !== '') {
      const keys = {
        key: this.apiKey.current.value,
        secret: this.apiSecret.current.value,
      };

      localStorage.setItem('apiKeys', JSON.stringify(keys));
      window.location.reload();
    }

    hideApiKeysForm();
    this.apiKey.current.value = '';
    this.apiSecret.current.value = '';
  }

  render() {
    let apiKeys = JSON.parse(localStorage.getItem('apiKeys'));

    if (apiKeys !== null) {
      if (apiKeys.key === '') {
        apiKeys.key = 'Put your API_KEY here...';
      }
      if (apiKeys.secret === '') {
        apiKeys.secret = 'Put your API_Secret here...';
      }
    } else {
      apiKeys = {};
      apiKeys.key = 'Put your API_KEY here...';
      apiKeys.secret = 'Put your API_Secret here...';
    }

    const { shown, hideApiKeysForm } = this.props;

    return (
      <div
        id="api-keys"
        className={`api-keys-form-wrapper ${shown}`}
      >
        <div className="api-keys-input-wrapper shadowed">
          <span>
            <input
              ref={this.apiKey}
              id="apiKey"
              placeholder={`Api key: ${apiKeys.key}`}
            />
          </span>
          <span>
            <input
              ref={this.apiSecret}
              id="apiSecret"
              placeholder={`Api secret: ${apiKeys.secret}`}
            />
          </span>
        </div>
        <div className="api-keys-confirm-buttons">
          <button
            type="button"
            id="confirm"
            className="primary"
            onClick={() => this.setApiKeys()}
          >✔
          </button>
          <button
            type="button"
            id="clear"
            onClick={() => hideApiKeysForm()}
          >✖
          </button>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { hideApiKeysForm },
)(ApiKeysForm);
