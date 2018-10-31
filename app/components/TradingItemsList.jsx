import React from 'react';
import { connect } from 'react-redux';
import TradingItem from './TradingItem';
import { deleteTradingItem } from '../actions/tradingItemsListActions';

const TradingItemsList = (props) => {
  const {
    itemsList, deleteTradingItem, setCrypto, setCurrency,
  } = props;

  const items = itemsList.map((item, idx) => (
    <TradingItem
      key={idx}
      id={idx}
      crypto={item.crypto}
      currency={item.currency}
      pair={`${item.crypto}_${item.currency}`}
      close={deleteTradingItem}
      setCrypto={setCrypto}
      setCurrency={setCurrency}
    />
  ));

  return <div className="trading-items app-block">{items}</div>;
};

const mapStateToProps = state => ({
  itemsList: state.tradingItemsList,
});

export default connect(
  mapStateToProps,
  { deleteTradingItem },
)(TradingItemsList);
