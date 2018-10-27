import React, { Component } from "react";
import { connect } from "react-redux";
import Graph from "./Graph.jsx";
import TradingMode from "./TradingMode.jsx";
import MarketOrders from "./MarketOrders.jsx";
import LatestDeals from "./LatestDeals.jsx";
import { getDeals, getPairSummary } from "../lib/apiCalls.js";

class TradingItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autoRefresh: false,
      avgPrice: {
        buy: "",
        sell: ""
      },
      avgPricePeriod: 30,
      canSpend: 1,
      dealProfit: 0.001,
      orderLifeTime: 5,
      summary: {}
    };
    this.setAvgPrice(this.props.pair, 30);
    this.updatePairSummary(this.props.pair);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(nextProps, prevState);

    // Return null to indicate no change to state.
    return null;
  }

  symbols = {
    USD: "$",
    RUB: "₽",
    UAH: "₴",
    PLN: "zł",
    EUR: "€",
    BTC: "₿",
    LTC: "LTC",
    USDT: "USDT",
    ETH: "ETH"
  };
/*
  componentWillReceiveProps(newProps) {
    this.setAvgPrice(newProps.pair, this.state.avgPricePeriod);
    this.updatePairSummary(newProps.pair);
  }
*/
  

  render() {
    let pair = `${this.props.crypto}_${this.props.currency}`;

    return (
      <div className="trading-item__wrapper shadowed">
        <div
          id={`trading-item__${this.props.id}`}
          className="trading-item app-block__item "
        >
          <Graph
            id={this.props.id}
            pair={pair}
            autoRefresh={this.state.autoRefresh}
            buyAvgPrice={this.state.avgPrice.buy}
            sellAvgPrice={this.state.avgPrice.sell}
            avgPricePeriod={this.state.avgPricePeriod}
            crypto={this.props.crypto}
            currency={this.props.currency}
            symbol={this.symbols[this.props.currency]}
            vol={this.state.summary.vol}
            volCurr={this.state.summary.vol_curr}
            close={() => this.props.close()}
            toggleRefresh={() => this.toggleRefresh()}
          />
          <TradingMode
            pair={pair}
            id={this.props.id}
            crypto={this.props.crypto}
            currency={this.props.currency}
            symbol={this.symbols[this.props.currency]}
            avgPricePeriod={this.state.avgPricePeriod}
            setAvgPricePeriod={event => this.setAvgPricePeriod(event)}
            dealProfit={this.state.dealProfit}
            canSpend={this.state.canSpend}
          />
          <MarketOrders
            pair={pair}
            crypto={this.props.crypto}
            currency={this.props.currency}
            autoRefresh={this.state.autoRefresh}
          />
        </div>
        <LatestDeals pair={pair} autoRefresh={this.state.autoRefresh} />
      </div>
    );
  }
}

TradingItem.prototype.setAvgPricePeriod = function(e) {
  let newAvgPricePeriod = parseInt(e.target.value, 10);
  this.setAvgPrice(this.props.pair, newAvgPricePeriod);
  this.setState({
    avgPricePeriod: newAvgPricePeriod
  });
};

TradingItem.prototype.setAvgPrice = function(pair, period) {
  let now = new Date();
  let deals = getDeals(pair, 10000);

  deals.then(data => {
    let actualBuyDeals = data.filter(deal => {
      let timePassed = now.getUnixTimestamp() - 0 * 60 * 60 - deal["date"];
      return deal.type === "buy" && timePassed < period * 60;
    });

    let buyPrices = actualBuyDeals.map(deal => {
      return parseFloat(deal["price"]);
    });

    let avgBuyPrice =
      Math.ceil(
        (buyPrices.reduce((first, next) => first + next, 0) /
          buyPrices.length) *
          10000
      ) / 10000;

    let actualSellDeals = data.filter(deal => {
      let timePassed = now.getUnixTimestamp() - 0 * 60 * 60 - deal["date"];
      return deal.type === "sell" && timePassed < period * 60;
    });

    let sellPrices = actualSellDeals.map(deal => {
      return parseFloat(deal["price"]);
    });

    let avgSellPrice =
      Math.ceil(
        (sellPrices.reduce((first, next) => first + next, 0) /
          sellPrices.length) *
          10000
      ) / 10000;

    let avgPrice = this.state.avgPrice;

    avgPrice["buy"] = avgBuyPrice;
    avgPrice["sell"] = avgSellPrice;

    this.setState({
      avgPrice: avgPrice
    });
  });
};

TradingItem.prototype.toggleRefresh = function() {
  this.setState({
    autoRefresh: !this.state.autoRefresh
  });
};

TradingItem.prototype.setDealProfit = function(val) {
  this.setState({
    dealProfit: val
  });
};

TradingItem.prototype.setCanSpend = function(val) {
  this.setState({
    canSpend: val
  });
};

TradingItem.prototype.setOrderLifeTime = function(val) {
  this.setState({
    orderLifeTime: val
  });
};

TradingItem.prototype.updatePairSummary = function(pair) {
  let summary = getPairSummary(pair);

  summary.then(data => {
    this.setState({
      summary: data
    });
  });
};

export default TradingItem;
