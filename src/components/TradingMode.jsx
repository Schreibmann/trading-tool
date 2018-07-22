import React, { Component } from "react";
import ManualTrading from "./ManualTrading.jsx";
import AutoTrading from "./AutoTrading.jsx";

class TradingMode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: "Auto"
    };
  }

  render() {
    let mode =
      this.state.mode === "Manual" ? (
        <ManualTrading
          id={this.props.id}
          pair={this.props.pair}
          crypto={this.props.crypto}
          currency={this.props.currency}
          symbol={this.props.symbol}
          setCrypto={(event, id) => this.props.setCrypto(event, id)}
          setCurrency={(event, id) => this.props.setCurrency(event, id)}
        />
      ) : (
        <AutoTrading
          id={this.props.id}
          pair={this.props.pair}
          crypto={this.props.crypto}
          currency={this.props.currency}
          symbol={this.props.symbol}
          setCurrency={(event, id) => this.props.setCurrency(event, id)}
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
        {/*<CurrentOrders orders={this.state.userOrders} updateOrders={() => this.updateUserOrders()}/>*/}
      </div>
    );
  }
}

TradingMode.prototype.setMode = function(e) {
  this.setState({
    mode: e.target.value
  });
};

export default TradingMode;
