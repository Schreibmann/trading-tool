import React, { Component } from 'react';
import { connect } from 'react-redux';
import TradingItem from './TradingItem';
import { deleteTradingItem } from '../actions/tradingItemsListActions';

class TradingItemsList extends Component {
  render() {
    const items = this.props.itemsList.map((item, idx) => (
      <TradingItem
        key={idx}
        id={idx}
        crypto={item.crypto}
        currency={item.currency}
        pair={`${item.crypto}_${item.currency}`}
        close={() => this.props.deleteTradingItem(idx)}
        setCrypto={(event, idx) => this.props.setCrypto(event, idx)}
        setCurrency={(event, idx) => this.props.setCurrency(event, idx)}
      />
    ));

    return <div className="trading-items app-block">{items}</div>;
  }
}

const mapStateToProps = state => ({
  itemsList: state.tradingItemsList,
});

export default connect(
  mapStateToProps,
  { deleteTradingItem },
)(TradingItemsList);
