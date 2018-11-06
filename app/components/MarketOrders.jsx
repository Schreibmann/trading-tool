import React from 'react';
import Orders from './Orders';
import { getOrderBook } from '../lib/apiCalls';

class MarketOrders extends React.PureComponent {
  state = {
    data: [],
  };

  componentDidMount() {
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

  componentWillUnmount() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  updateOrderBook() {
    const orderBook = getOrderBook(this.props.pair);
    orderBook.then((data) => {
      this.setState({
        data,
      });
    });
  }

  render() {
    return (
      <div className="market-orders-wrapper">
        <Orders
          type="Buy"
          orders={this.state.data.bid}
          crypto={this.props.crypto}
          currency={this.props.currency}
        />
        <Orders
          type="Sell"
          orders={this.state.data.ask}
          crypto={this.props.crypto}
          currency={this.props.currency}
        />
      </div>
    );
  }
}

export default MarketOrders;
