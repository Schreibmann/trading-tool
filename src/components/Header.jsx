import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import { connect } from 'react-redux';
import { getUserInfo, getUserOrders } from '../lib/apiCalls';
import ApiKeysForm from './ApiKeysForm';
import { showApiKeysForm } from '../actions/apiKeysFormActions';
import { addTradingItem } from '../actions/tradingItemsListActions';
import { showModal, hideModal } from '../actions/modalActions';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      balances: null,
      reserved: null,
    };
  }

  componentWillMount() {
    this.updateBalance();
  }

  updateBalance() {
    const balanceData = getUserInfo();
    balanceData.then((data) => {
      if (data.hasOwnProperty('error')) {
        console.log('Updating balance failed with', data.error);
        this.setState({
          balances: null,
          reserved: null,
        });
      } else if (
        data.hasOwnProperty('balances')
          && data.hasOwnProperty('reserved')
      ) {
        this.setState({
          balances: data.balances,
          reserved: data.reserved,
        });
        console.log('Balance data updated.');
      } else {
        console.log(
          'Updating balance failed. Api key is not specified or not valid',
        );
        this.setState({
          balances: null,
          reserved: null,
        });
      }
    });
  }

  updateUserOrders() {
    const orders = getUserOrders();
    orders.then((data) => {
      if (data.hasOwnProperty('error')) {
        console.log('Updating user orders failed with', data.error);
      } else {
        this.setState({
          userOrders: orders,
        });
        console.log('User orders info updated.');
      }
    });
  }

  render() {
    const balances = [];
    let rows;

    if (this.state.balances !== null) {
      for (const curr in this.state.balances) {
        balances.push([
          curr,
          this.state.balances[curr],
          this.state.reserved[curr],
        ]);
      }

      rows = balances.map((entry, key) => (
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
      ));
    } else {
      rows = (
        <label className="processing-data__label">
          Query error. Ensure your api keys are valid.
        </label>
      );
    }

    return (
      <div className="header wrapper">
        <Modal
          visible={this.props.modal.show}
          width="666px"
          effect="fadeInDown"
          onClickAway={() => this.props.hideModal()}
        >
          <div className="modal-content-wrapper shadowed">
            <p>{this.props.modal.text}</p>
            <button
              className="closeModalbtn btn"
              onClick={() => this.props.hideModal()}
            >
              Ясно
            </button>
          </div>
        </Modal>
        <div className="app__header shadowed">
          <div className="header-wrapper">
            <div className="app__header-menu">
              <ul>
                <li
                  className="shadowed"
                  onClick={() => this.props.addTradingItem()}
                >
                  <a>Add block</a>
                </li>
                <li
                  className="shadowed"
                  onClick={() => this.props.showModal('test ok')}
                >
                  <a>Test modal</a>
                </li>
                <li className="shadowed">
                  <a>
                    <div className="balance-informer">
                      <div className="balance-informer__wrapper">
                        <span
                          className="tooltip"
                          title="Click to update"
                          onClick={() => this.updateBalance()}
                        >
                          Balance
                          <span className="shadowed-black">
                            <div className="balance app-block">
                              <div className="balance__header shadowed">
                                <div className="balance__header-col">
                                  <div className="header-col__caption">
                                    <label className="caption__label">
                                      currency
                                    </label>
                                  </div>
                                </div>
                                <div className="balance__header-col">
                                  <div className="header-col__caption">
                                    <label className="caption__label">
                                      balance
                                    </label>
                                  </div>
                                </div>
                                <div className="balance__header-col">
                                  <div className="header-col__caption">
                                    <label className="caption__label">
                                      in orders
                                    </label>
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
                <li
                  className="shadowed"
                  onClick={() => this.props.showApiKeysForm()}
                >
                  <a>Api keys</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <ApiKeysForm shown={this.props.apiKeysForm} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  modal: state.modal,
  apiKeysForm: state.apiKeysForm,
});

export default connect(
  mapStateToProps,
  {
    addTradingItem, showModal, hideModal, showApiKeysForm,
  },
)(Header);
