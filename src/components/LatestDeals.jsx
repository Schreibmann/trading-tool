import React, { Component } from 'react';
import { getDeals } from '../lib/apiCalls.js';

class LatestDeals extends Component {

	constructor(props) {

    super(props);

      this.state = {
        data: []
      };
}

componentWillReceiveProps(newProps) {
  if (newProps.autoRefresh && !this.intervalId) {
    this.intervalId = setInterval(() => this.updateDeals(), 1666);
  } else if (!newProps.autoRefresh && this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
    } else this.updateDeals();     
}

componentWillMount() {
  //console.log('LatestDeals.jsx module will mount');
}

componentWillUnmount() {
  clearInterval(this.intervalId);
}
/*
updateDeals() {
  let deals = getDeals(this.props.pair, 15);
  deals.then(data => {
    //data.sort( (first, next) => next.date - first.date ); //Sort by time, latest first
    this.setState({
      data: data
    })
  });
}  
*/
  render() {

  	let deals = this.state.data.map( (deal, key) =>  {

      return (

      	<div className="deal shadowed" key={key}>
          <div className={`deal-cell__${deal.type}`}>
            <div className="deal-cell__price">
              <label>{Math.ceil(deal.price*10000)/10000}</label>
            </div>
            <div className="deal-cell__type">
              <label>{deal.type}</label>
            </div>
          </div>  
        </div>

      )
    }) 

    return (

    <div className="latest-deals app-block__item__elem">
        {deals}
    </div>  

    );
  }
}

LatestDeals.prototype.updateDeals = function() {
  let deals = getDeals(this.props.pair, 15);
  deals.then(data => {
    //data.sort( (first, next) => next.date - first.date ); //Sort by time, latest first
    this.setState({
      data: data
    })
  });
} 

export default LatestDeals;
