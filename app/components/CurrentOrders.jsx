import React, { Component } from 'react';

class CurrentOrders extends Component {
  componentDidMount() {
    //  this.intervalId = setInterval( () => this.init( `trades/?pair=${BTC_USD}` ), 3000 );   // store intervalId in the state so it can be accessed later:
  }

  componentWillUnmount() {
    //  clearInterval(this.intervalId);
  }

  render() {
    return (
      <div className="current-orders">
        <div className="current-orders__caption">
          <label
            id="current-orders__caption"
            title="Click to update"
            onClick={() => this.props.updateOrders()}
          >
            Current orders
          </label>
        </div>
        <div className="sell-order-info">
          <div className="sell-order-info__header controls-form__item shadowed">
            <div className="order-info__header-col">
              <div className="header-col__caption">
                <label className="caption__label">amount</label>
              </div>
            </div>
            <div className="order-info__header-col">
              <div className="header-col__caption">
                <label className="caption__label">price</label>
              </div>
            </div>
            <div className="order-info__header-col">
              <div className="header-col__caption">
                <label className="caption__label">sum</label>
              </div>
            </div>
            <div className="order-info__header-col">
              <div className="header-col__caption">
                <label className="caption__label">pair</label>
              </div>
            </div>
          </div>
          <div className="order-info__body controls-form__item app-block__item__elem">
            <div className="order-info__body-content">
              <label>nothing to display</label>
            </div>
          </div>
        </div>
        <div className="buy-order-info">
          <div className="buy-order-info__header controls-form__item shadowed">
            <div className="order-info__header-col">
              <div className="header-col__caption">
                <label className="caption__label">amount</label>
              </div>
            </div>
            <div className="order-info__header-col">
              <div className="header-col__caption">
                <label className="caption__label">price</label>
              </div>
            </div>
            <div className="order-info__header-col">
              <div className="header-col__caption">
                <label className="caption__label">sum</label>
              </div>
            </div>
            <div className="order-info__header-col">
              <div className="header-col__caption">
                <label className="caption__label">pair</label>
              </div>
            </div>
          </div>
          <div className="order-info__body controls-form__item app-block__item__elem">
            <div className="order-info__body-content">
              <label>nothing to display</label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CurrentOrders;
