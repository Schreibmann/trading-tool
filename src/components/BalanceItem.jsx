import React, { Component } from 'react';

class BalanceItem extends Component {

  render() {

    return (

          <div class="balance__content__row">
            <div class="balance__content__cell app-block__item__elem">
              <label>{this.props.data.валюта}</label>
            </div>
            <div class="balance__content__cell">
              <label>{this.props.data.баланс}</label>
            </div>
            <div class="balance__content__cell">
              <label>{this.props.data.в ордерах}</label>
            </div>
          </div>

    );
  }
}

export default BalanceItem;
