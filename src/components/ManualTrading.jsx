import React, { Component } from "react";
import { createOrder, getPairSummary } from "../lib/apiCalls.js";
import Modal from "react-awesome-modal";

class ManualTrading extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      modalText: "fuck",
      summary: {}
    };

    this.updatePairSummary(this.props.pair);
  }

  componentWillReceiveProps(newProps) {
    this.updatePairSummary(newProps.pair);
  }

  render() {
    return (
      <div className="manual-trading__inner">
        <Modal
          visible={this.state.showModal}
          width="auto"
          effect="fadeInDown"
          onClickAway={() => this.closeModal()}
        >
          <div className="modal-content-wrapper shadowed">
            <p>{this.state.modalText}</p>
            <button
              className="closeModalbtn btn"
              onClick={() => this.closeModal()}
            >
              Close
            </button>
          </div>
        </Modal>

        <div className="crypto-amount">
          <input
            ref="amount"
            type="number"
            step="0.001"
            className="amount"
            id="amount"
            name="amount"
            placeholder="amount"
            required
            onChange={e => this.showHint(e)}
          />
          <select
            className="curr-pair_select-crypto"
            id="crypto"
            name="crypto"
            value={this.props.crypto}
            onChange={(event, id) => this.props.setCrypto(event, this.props.id)}
          >
            <option value="BTC">BTC</option>
            <option value="LTC">LTC</option>
            <option value="DOGE">DOGE</option>
            <option value="DASH">DASH</option>
            <option value="ETH">ETH</option>
            <option value="WAVES">WAVES</option>
            <option value="ZEC">ZEC</option>
            <option value="USDT">USDT</option>
            <option value="XMR">XMR</option>
            <option value="XRP">XRP</option>
            <option value="KICK">KICK</option>
            <option value="ETC">ETC</option>
            <option value="BCH">BCH</option>
          </select>
        </div>
        <div className="currency-price">
          <input
            ref="price"
            type="number"
            step="0.001"
            className="price"
            id="price"
            name="price"
            placeholder="price"
            required
            onChange={e => this.showHint(e)}
          />
          <select
            className="curr-pair_select-currency "
            id="currency"
            name="currency"
            value={this.props.currency}
            onChange={(event, id) =>
              this.props.setCurrency(event, this.props.id)
            }
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="RUB">RUB</option>
            <option value="PLN">PLN</option>
            <option value="UAH">UAH</option>
            <option value="USDT">USDT</option>
            <option value="BTC">BTC</option>
            <option value="ETH">ETH</option>
            <option value="LTC">LTC</option>
          </select>
        </div>
        <div className="order-creation-hint">
          <div className="hint-row">
            <div className="hint-cell hint-info">
              <label>Total: </label>
            </div>
            <div className="hint-cell hint-value">
              <label ref="totalVal">0.000 {this.props.currency}</label>
            </div>
          </div>
          <div className="hint-row">
            <div className="hint-cell hint-info">
              <label>Buy fee: </label>
            </div>
            <div className="hint-cell hint-value">
              <label ref="buyFeeVal">0.000 {this.props.crypto}</label>
            </div>
          </div>
          <div className="hint-row">
            <div className="hint-cell hint-info">
              <label>Sell fee: </label>
            </div>
            <div className="hint-cell hint-value">
              <label ref="sellFeeVal">0.000 {this.props.currency}</label>
            </div>
          </div>
        </div>
        <div className="divider">
          <div className="divider__caption">
            <label>Create order</label>
          </div>
        </div>
        <div className="order-creation-buttons">
          <div className="hint-row">
            <button
              className="btn buy"
              onClick={() =>
                this.openModal(
                  createOrder(
                    this.props.pair,
                    parseFloat(this.refs.amount.value),
                    parseFloat(this.refs.price.value),
                    "buy"
                  )
                )
              }
            >
              buy
            </button>
            <button
              className="btn sell"
              onClick={() =>
                this.openModal(
                  createOrder(
                    this.props.pair,
                    parseFloat(this.refs.amount.value),
                    parseFloat(this.refs.price.value),
                    "sell"
                  )
                )
              }
            >
              sell
            </button>
          </div>
        </div>
        <div className="divider">
          <div className="divider__caption">
            <label>Pair prices info</label>
          </div>
        </div>
        <div className="pair-info-wrapper">
          <div className="hint-row">
            <div className="hint-cell hint-info">
              <label>Daily max: </label>
            </div>
            <div className="hint-cell hint-value">
              <label>{`${parseFloat(this.state.summary.high).toFixed(3)} ${
                this.props.symbol
              }`}</label>
            </div>
          </div>
          <div className="hint-row">
            <div className="hint-cell hint-info">
              <label>Daily min: </label>
            </div>
            <div className="hint-cell hint-value">
              <label>{`${parseFloat(this.state.summary.low).toFixed(3)} ${
                this.props.symbol
              }`}</label>
            </div>
          </div>
          <div className="hint-row">
            <div className="hint-cell hint-info">
              <label>Daily average: </label>
            </div>
            <div className="hint-cell hint-value">
              <label>{`${parseFloat(this.state.summary.avg).toFixed(3)} ${
                this.props.symbol
              }`}</label>
            </div>
          </div>
          <div className="hint-row">
            <div className="hint-cell hint-info">
              <label>Current max buy: </label>
            </div>
            <div className="hint-cell hint-value">
              <label>{`${parseFloat(this.state.summary.buy_price).toFixed(3)} ${
                this.props.symbol
              }`}</label>
            </div>
          </div>
          <div className="hint-row">
            <div className="hint-cell hint-info">
              <label>Current min sell: </label>
            </div>
            <div className="hint-cell hint-value">
              <label>{`${parseFloat(this.state.summary.sell_price).toFixed(
                3
              )} ${this.props.symbol}`}</label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ManualTrading.prototype.openModal = function(msg) {
  if (
    msg !== null &&
    (typeof msg === "object" || typeof msg === "function") &&
    typeof msg.then === "function"
  ) {
    msg.then(text => {
      this.setState({
        modalText: text,
        showModal: true
      });
    });
  } else {
    this.setState({
      modalText: msg,
      showModal: true
    });
  }
};

ManualTrading.prototype.closeModal = function() {
  this.setState({
    showModal: false
  });
};

ManualTrading.prototype.updatePairSummary = function(pair) {
  let summary = getPairSummary(pair);

  summary.then(data => {
    this.setState({
      summary: data
    });
  });
};

ManualTrading.prototype.showHint = function(event) {
  this.refs.totalVal.innerHTML = `${Math.ceil(
    parseFloat(this.refs.amount.value * this.refs.price.value) * 100000000
  ) / 100000000} ${this.props.currency}`;
  this.refs.buyFeeVal.innerHTML = `${Math.ceil(
    parseFloat(this.refs.amount.value * 0.002) * 100000000
  ) / 100000000} ${this.props.crypto}`;
  this.refs.sellFeeVal.innerHTML = `${Math.ceil(
    parseFloat(this.refs.amount.value * 0.002 * this.refs.price.value) *
      100000000
  ) / 100000000} ${this.props.currency}`;
};

export default ManualTrading;
