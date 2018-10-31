import React, { Component } from 'react';
import { connect } from 'react-redux';
import ManualTrading from './ManualTrading';
import AutoTrading from './AutoTrading';
import { setCrypto, setCurrency } from '../actions/tradingItemsListActions';

const PAIRS = [
  'BTC_USD',
  'BTC_EUR',
  'BTC_RUB',
  'BTC_UAH',
  'BTC_PLN',
  'BCH_BTC',
  'BCH_USD',
  'BCH_RUB',
  'BCH_ETH',
  'DASH_BTC',
  'DASH_USD',
  'DASH_RUB',
  'ETH_BTC',
  'ETH_LTC',
  'ETH_USD',
  'ETH_EUR',
  'ETH_RUB',
  'ETH_UAH',
  'ETH_PLN',
  'ETC_BTC',
  'ETC_USD',
  'ETC_RUB',
  'LTC_BTC',
  'LTC_USD',
  'LTC_EUR',
  'LTC_RUB',
  'ZEC_BTC',
  'ZEC_USD',
  'ZEC_EUR',
  'ZEC_RUB',
  'XRP_BTC',
  'XRP_USD',
  'XRP_RUB',
  'XMR_BTC',
  'XMR_USD',
  'XMR_EUR',
  'BTC_USDT',
  'ETH_USDT',
  'USDT_USD',
  'USDT_RUB',
  'USD_RUB',
  'DOGE_BTC',
  'WAVES_BTC',
  'WAVES_RUB',
  'KICK_BTC',
  'KICK_ETH',
];

class TradingMode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: 'Auto',
    };
  }

  onChangeCrypto(e) {
    const pair = `${e.target.value}_${this.props.currency}`;
    if (PAIRS.includes(pair) > -1) {
      this.props.setCrypto(this.props.id, e.target.value);
    } else {
      e.preventDefault();
      alert(`Pair ${pair} not available at stock.`);
    }
  }

  onChangeCurrency(e) {
    const pair = `${this.props.crypto}_${e.target.value}`;
    if (PAIRS.includes(pair) > -1) {
      this.props.setCurrency(this.props.id, e.target.value);
    } else {
      e.preventDefault();
      alert(`Pair ${pair} not available at stock.`);
    }
  }

  render() {
    const mode = this.state.mode === 'Manual' ? (
      <ManualTrading
        id={this.props.id}
        pair={this.props.pair}
        crypto={this.props.crypto}
        currency={this.props.currency}
        symbol={this.props.symbol}
        setCrypto={e => this.onChangeCrypto(e)}
        setCurrency={e => this.onChangeCurrency(e)}
      />
    ) : (
      <AutoTrading
        id={this.props.id}
        pair={this.props.pair}
        crypto={this.props.crypto}
        currency={this.props.currency}
        symbol={this.props.symbol}
        setCrypto={e => this.onChangeCrypto(e)}
        setCurrency={e => this.onChangeCurrency(e)}
        avgPricePeriod={this.props.avgPricePeriod}
        setAvgPricePeriod={event => this.props.setAvgPricePeriod(event)}
      />
    );

    return (
      <div className="trading-mode-item app-block__item__elem">
        <div className="blockheader shadowed left">
          <label>Trading mode</label>
          <select
            className="trading-mode"
            id="trding-mode"
            value={this.state.mode}
            onChange={event => this.setMode(event)}
          >
            <option value="Manual">Manual</option>
            <option value="Auto">Auto</option>
          </select>
        </div>
        <div className="trading-mode__inner">{mode}</div>
        {/* <CurrentOrders orders={this.state.userOrders} updateOrders={() => this.updateUserOrders()}/> */}
      </div>
    );
  }
}

TradingMode.prototype.setMode = function(e) {
  this.setState({
    mode: e.target.value,
  });
};

export default connect(
  null,
  { setCrypto, setCurrency },
)(TradingMode);
