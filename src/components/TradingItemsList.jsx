import React, { Component } from 'react';
import TradingItem from './TradingItem.jsx';


class TradingItemsList extends Component {

render() {

let items = this.props.tradingItemsList.map( (item, idx) => {
      		return (
      			<TradingItem 
      				key={idx} id={idx} 
      				crypto={item.crypto} currency={item.currency} pair={`${item.crypto}_${item.currency}`}
      				close={() => this.props.close(idx)} 
      				setCrypto={(event, idx) => this.props.setCrypto(event, idx)}
      				setCurrency={(event, idx) => this.props.setCurrency(event, idx)}
      			/>
      		)
});

    return (
     <div className="trading-items app-block">
    	{items}
     </div> 
    );
  }
}

export default TradingItemsList;
