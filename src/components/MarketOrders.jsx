import React, { Component } from 'react';
import Orders from './Orders.jsx';
import { getOrderBook } from '../lib/apiCalls.js';

class MarketOrders extends Component {

	constructor(props) {

    super(props);

    this.state = {
      data: []
    }

  this.updateOrderBook();
}

componentWillReceiveProps(newProps) {
  if (newProps.autoRefresh && !this.intervalId) {
    this.intervalId = setInterval(() => this.updateOrderBook(), 1500);
  } else if (!newProps.autoRefresh && this.intervalId) {
    clearInterval(this.intervalId);
    this.intervalId = null;
  } else this.updateOrderBook();
}

componentWillMount() {
  
}

componentWillUnmount(){
  clearInterval(this.intervalId);
  this.intervalId = null;
}
/*
updateOrderBook() {
  let orderBook = getOrderBook(this.props.pair);
  orderBook.then(data => {
    this.setState({
      data: data
    });
  });
}
*/
  render() {

    return (
    	<div className="market-orders-wrapper">
	    	<Orders
            type='Buy' 
	    	    orders={this.state.data.bid}
	          crypto={this.props.crypto}
	          currency={this.props.currency}
	        />
	        <Orders 
            type='Sell'
	          orders={this.state.data.ask}
	          crypto={this.props.crypto}
	          currency={this.props.currency}
	        />
        </div>
    );
  }
}

MarketOrders.prototype.updateOrderBook = function() {
  let orderBook = getOrderBook(this.props.pair);
  orderBook.then(data => {
    this.setState({
      data: data
    });
  });
}

export default MarketOrders;
