import React from 'react';
import { connect } from 'react-redux';
import TradingItem from './TradingItem';

const TradingItemsList = (props) => {
  const {
    itemsList,
  } = props;

  const items = itemsList.map((item, idx) => (
    <TradingItem
      key={idx}
      id={idx}
      crypto={item.crypto}
      currency={item.currency}
      pair={`${item.crypto}_${item.currency}`}
    />
  ));

  return (
    <div className="app__content">
      <div className="trading-items app-block">{items}</div>
    </div>
  );
};

const mapStateToProps = state => ({
  itemsList: state.tradingItemsList,
});

export default connect(
  mapStateToProps,
)(TradingItemsList);
