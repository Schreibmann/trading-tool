import React, { Component } from 'react';
import { Provider } from 'react-redux';
import TradingItemsList from './components/TradingItemsList.jsx';
import Header from './components/Header.jsx';
import Canvas from './components/Canvas.jsx';
import Logo from './components/logo.jsx';
import store from './store';
import './view/reset.css';
import './view/main.css';

const PAIRS = ['BTC_USD','BTC_EUR','BTC_RUB','BTC_UAH','BTC_PLN','BCH_BTC','BCH_USD','BCH_RUB','BCH_ETH','DASH_BTC','DASH_USD','DASH_RUB','ETH_BTC','ETH_LTC',
               'ETH_USD','ETH_EUR','ETH_RUB','ETH_UAH','ETH_PLN','ETC_BTC','ETC_USD','ETC_RUB','LTC_BTC','LTC_USD','LTC_EUR','LTC_RUB','ZEC_BTC','ZEC_USD',
               'ZEC_EUR','ZEC_RUB','XRP_BTC','XRP_USD','XRP_RUB','XMR_BTC','XMR_USD','XMR_EUR','BTC_USDT','ETH_USDT','USDT_USD','USDT_RUB','USD_RUB','DOGE_BTC',
               'WAVES_BTC','WAVES_RUB','KICK_BTC','KICK_ETH'];

class App extends Component {

addTradingItem() {
  let newTradingItemsList = this.state.tradingItemsList;
  newTradingItemsList.push({crypto: 'BTC', currency: 'USD'});
  this.setState({
    tradingItemsList: newTradingItemsList
  })
}

removeTradingItem(id) {
  let newTradingItemsList = this.state.tradingItemsList;
  newTradingItemsList.splice(id, 1);
  this.setState({
    tradingItemsList: newTradingItemsList
  })
}

setCrypto(e, id) {
  let pair = `${e.target.value}_${this.state.tradingItemsList[id].currency}`;
  if (PAIRS.indexOf(pair) > -1) {
    let newTradingItemsList = this.state.tradingItemsList;
    newTradingItemsList[id].crypto = e.target.value;
    this.setState ({
      tradingItemsList: newTradingItemsList
    })  
  } else alert(`Pair ${pair} not available at stock.`);
  
}

setCurrency(e, id) {
  let pair = `${this.state.tradingItemsList[id].crypto}_${e.target.value}`;
  if (PAIRS.indexOf(pair) > -1) {
    let newTradingItemsList = this.state.tradingItemsList;
    newTradingItemsList[id].currency = e.target.value;
    this.setState ({
      tradingItemsList: newTradingItemsList
    })  
  } else alert(`Pair ${pair} not available at stock.`);
  
}

  render() {    

    return (
      <Provider store={store}>
        <div className="container">
          <Header add={() => this.addTradingItem()}/>          
          <Canvas/>
          <Logo/>
          <div className="app__content">       
            <TradingItemsList 
              close={(idx) => this.removeTradingItem(idx)} 
              setCrypto={(event, idx) => this.setCrypto(event, idx)}
              setCurrency={(event, idx) => this.setCurrency(event, idx)}
            />
          </div>  
        </div>
      </Provider>
    );
  }
}



export default App;
