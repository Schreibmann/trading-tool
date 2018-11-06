import React from 'react';

const Orders = (props) => {
  const {
    orders, type, crypto, currency,
  } = props;
  const rows = orders
    ? orders.map((row, key) => (
      <div className="order-table__row" key={key}>
        <div className="order-table__cell">
          <label>{Math.ceil(row[0] * 10000) / 10000}</label>
        </div>
        <div className="order-table__cell">
          <label>{Math.ceil(row[1] * 10000) / 10000}</label>
        </div>
        <div className="order-table__cell">
          <label>{Math.ceil(row[2] * 10000) / 10000}</label>
        </div>
      </div>
    ))
    : (<label className="processing-data__label">Processing data...</label>);

  return (
    <div className="sell-orders orders-list app-block__item__elem">
      <div className="orders-list__wrapper">
        <div className="blockheader shadowed">
          <label>
            {type}{' '}orders
          </label>
        </div>
        <div className="orders-list__header shadowed">
          <div className="orders-list__header-col ">
            <div className="header-col__caption">
              <label className="caption__label">Price</label>
            </div>
          </div>
          <div className="orders-list__header-col">
            <div className="header-col__caption">
              <label className="caption__label">{crypto}</label>
            </div>
          </div>
          <div className="orders-list__header-col">
            <div className="header-col__caption">
              <label className="caption__label">{currency}</label>
            </div>
          </div>
        </div>
        <div className="orders-list__body  app-block__item__elem">
          <div className="order-content__scrollable shadowed">{rows}</div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
