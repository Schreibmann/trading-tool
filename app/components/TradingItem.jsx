import React, { Component } from 'react';
import Graph from './Graph';
import TradingMode from './TradingMode';
import MarketOrders from './MarketOrders';
import LatestDeals from './LatestDeals';
import { getDeals, getPairSummary } from '../lib/apiCalls';

class TradingItem extends Component {
 /*
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(nextProps);
  }
  */
 state = {
   autoRefresh: false,
   avgPrice: {
     buy: '',
     sell: '',
   },
   avgPricePeriod: 30,
   canSpend: 1,
   dealProfit: 0.001,
   orderLifeTime: 5,
   summary: {},
 };

 componentDidMount() {
   const { pair } = this.props;
   const { avgPricePeriod } = this.state;
   this.setAvgPrice(pair, avgPricePeriod);
   this.setSummary(pair);
 }

 componentWillReceiveProps(newProps) {
   const { pair } = newProps;
   const { avgPricePeriod } = this.state;
   this.setAvgPrice(pair, avgPricePeriod);
   this.setSummary(pair);
 }

 setAvgPricePeriod = (e) => {
   const { pair } = this.props;
   const newAvgPricePeriod = parseInt(e.target.value, 10);
   this.setAvgPrice(pair, newAvgPricePeriod);
   this.setState({
     avgPricePeriod: newAvgPricePeriod,
   });
 };

 setAvgPrice = (pair, period) => {
   const now = new Date();
   const deals = getDeals(pair, 10000);

   deals
     .then((data) => {
       const actualBuyDeals = data.filter((deal) => {
         const timePassed = now.getUnixTimestamp() - 0 * 60 * 60 - deal.date;
         return deal.type === 'buy' && timePassed < period * 60;
       });

       const buyPrices = actualBuyDeals.map((deal) => {
         return parseFloat(deal.price);
       });

       const avgBuyPrice = Math.ceil(
         (buyPrices.reduce((first, next) => first + next, 0)
       / buyPrices.length)
       * 10000,
       ) / 10000;

       const actualSellDeals = data.filter((deal) => {
         const timePassed = now.getUnixTimestamp() - 0 * 60 * 60 - deal.date;
         return deal.type === 'sell' && timePassed < period * 60;
       });

       const sellPrices = actualSellDeals.map((deal) => {
         return parseFloat(deal.price);
       });

       const avgSellPrice = Math.ceil(
         (sellPrices.reduce((first, next) => first + next, 0)
       / sellPrices.length)
       * 10000,
       ) / 10000;

       const { avgPrice } = this.state;

       avgPrice.buy = avgBuyPrice;
       avgPrice.sell = avgSellPrice;
       this.setState({
         avgPrice,
       });
     })
     .catch((err) => {
       console.log(err);
     });
 };

 toggleRefresh = () => {
   const { autoRefresh } = this.state;
   this.setState({
     autoRefresh: !autoRefresh,
   });
 };

 setDealProfit = (val) => {
   this.setState({
     dealProfit: val,
   });
 };

 setCanSpend = (val) => {
   this.setState({
     canSpend: val,
   });
 };

 setOrderLifeTime = (val) => {
   this.setState({
     orderLifeTime: val,
   });
 };

 setSummary = (pair) => {
   const summary = getPairSummary(pair);
   summary.then((data) => {
     this.setState({
       summary: data,
     });
   });
 };

 render() {
   const {
     pair, id, crypto, currency,
   } = this.props;

   const symbols = {
     USD: '$',
     RUB: '₽',
     UAH: '₴',
     PLN: 'zł',
     EUR: '€',
     BTC: '₿',
     LTC: 'LTC',
     USDT: 'USDT',
     ETH: 'ETH',
   };

   return (
     <div className="trading-item__wrapper shadowed">
       <div
         id={`trading-item__${id}`}
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
           symbol={symbols[this.props.currency]}
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
           symbol={symbols[this.props.currency]}
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

export default TradingItem;
