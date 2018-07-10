import React, { Component } from 'react';
import { getUserInfo, getUserOrders } from '../lib/apiCalls.js';
import ApiKeysForm from '../components/ApiKeysForm.jsx';

class Header extends Component {

  constructor(props) {

    super(props);

    this.state = {
        apiKeysForm: 'notShown',
        balances: null,
        reserved: null,
        userOrders: ''
      }; 
  }

  componentWillMount() {
    this.updateBalance();
  }

  updateBalance() { 

        let balanceData = getUserInfo();
        balanceData.then(data => {
          if (data.hasOwnProperty('error')) {
            console.log("Updating balance failed with", data.error);
            this.setState ({
              balances: null,
              reserved: null
            })
          } else {
              if (data.hasOwnProperty('balances') &&  data.hasOwnProperty('reserved')) {
                this.setState ({
                  balances: data.balances,
                  reserved: data.reserved
                })
                console.log("Balance data updated.");
              } else {
                  console.log("Updating balance failed. Api key is not specified or not valid");
                  this.setState ({
                    balances: null,
                    reserved: null
                  })
              }
            }  
        });
  }
  
  updateUserOrders() {
    let orders = getUserOrders();
      orders.then(data => {
        if (data.hasOwnProperty('error')) {
          console.log("Updating user orders failed with", data.error);
        } else {
          this.setState ({
            userOrders: orders
          })
          console.log("User orders info updated.");
        }
      });
  }

  showApiKeys() {
  this.setState({
    apiKeysForm: 'shown'
  });
}

hideApiKeys() {
  this.setState({
    apiKeysForm: 'notShown'
  });
}

  render() {

    let balances =[];
    let rows;

    if (this.state.balances !== null) {

      for (let curr in this.state.balances) {
        balances.push([curr, this.state.balances[curr], this.state.reserved[curr]])
      };

      rows = balances.map((entry, key) => {
        return (
              <div className="balance__content__row" key={key}>
                  <div className="balance__content__cell app-block__item__elem">
                    <label>{entry[0]}</label>
                  </div>
                  <div className="balance__content__cell">
                    <label>{entry[1]}</label>
                  </div>
                  <div className="balance__content__cell">
                    <label>{entry[2]}</label>
                  </div>
              </div>
        )
      });

    } else rows = <label className="processing-data__label">Query error. Ensure your api keys are valid.</label>;

    return (
    <div className="header wrapper">
      <div className="app__header shadowed">
        <div className="header-wrapper">
          <div className="app__header-menu">
          <ul>
            <li className="shadowed" onClick={() => this.props.add()}><a>Add block</a></li>     
            <li className="shadowed"><a>Help</a></li>        
            <li className="shadowed"> 
              <a>
                <div className="balance-informer">
                  <div className="balance-informer__wrapper">
                    <span className="tooltip" title="Click to update" onClick={() => this.updateBalance()}>Balance
                      <span className="shadowed-black">
                        <div className="balance app-block">
                          <div className="balance__header shadowed">
                            <div className="balance__header-col">
                              <div className="header-col__caption">
                                <label className="caption__label">currency</label>
                              </div>
                            </div>
                            <div className="balance__header-col">
                              <div className="header-col__caption">
                                <label className="caption__label">balance</label>
                              </div>
                            </div>
                            <div className="balance__header-col">
                              <div className="header-col__caption">
                                <label className="caption__label">in orders</label>
                              </div>
                            </div>
                          </div>  
                          <div className="balance__content shadowed">
                            {rows}      
                          </div> 
                        </div>    
                      </span>
                    </span>     
                  </div>
                </div>
              </a>            
            </li> 
            <li className="shadowed" onClick={() => this.showApiKeys()}>
              <a>Api keys</a>              
            </li>    
          </ul>

          </div>
        </div>
      </div>
      <ApiKeysForm shown={this.state.apiKeysForm} hideApiKeys={() => this.hideApiKeys()}/>
    </div>

    );
  }
}

export default Header;
