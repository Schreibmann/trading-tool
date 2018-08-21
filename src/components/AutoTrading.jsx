import React, { Component } from 'react';
import Controls from './Controls';
import Console from './Console';
import { api_query, getDeals } from '../lib/apiCalls';
import { now } from '../lib/scripts';

class AutoTrading extends Component {
  constructor(props) {
    super(props);

    this.consoleText = [];

    this.state = {
      trading: false,
      showConsole: false,
      consoleText: this.consoleText,
    };
  }

  render() {
    const visibility = this.state.showConsole ? 'visible' : 'hidden';

    return (
      <div className="auto-trading__inner">
        <Console visibility={visibility} text={this.state.consoleText} />
        <div className="curr-pair app-block__item__elem">
          <div className="curr-pair__label ">
            <label className="">Currency pair</label>
          </div>
          <div className="curr-pair__values ">
            <select
              className="curr-pair_select-currency"
              id="currency"
              name="currency"
              value={this.props.currency}
              onChange={e => this.props.setCurrency(e)}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="RUB">RUB</option>
              <option value="PLN">PLN</option>
              <option value="UAH">UAH</option>
              <option value="USDT">USDT</option>
              <option value="BTC">BTC</option>
              <option value="ETH">ETH</option>
              <option value="LTC">LTC</option>
            </select>

            <select
              className="curr-pair_select-crypto "
              id="crypto"
              name="crypto"
              value={this.props.crypto}
              onChange={e => this.props.setCrypto(e)}
            >
              <option value="BTC">BTC</option>
              <option value="LTC">LTC</option>
              <option value="DOGE">DOGE</option>
              <option value="DASH">DASH</option>
              <option value="ETH">ETH</option>
              <option value="WAVES">WAVES</option>
              <option value="ZEC">ZEC</option>
              <option value="USDT">USDT</option>
              <option value="XMR">XMR</option>
              <option value="XRP">XRP</option>
              <option value="KICK">KICK</option>
              <option value="ETC">ETC</option>
              <option value="BCH">BCH</option>
            </select>
          </div>
        </div>

        <div className="check-period controls-form__item app-block__item__elem">
          <div className="check-period__label">
            <label className="check-period__label-caption">
              Average price period
            </label>
          </div>
          <div className="check-period__values">
            <select
              className="avg-price-period"
              id="avg-price-period"
              name="avg-price-period"
              value={this.props.avgPricePeriod}
              onChange={event => this.props.setAvgPricePeriod(event)}
            >
              <option value="5">5 min</option>
              <option value="10">10 min</option>
              <option value="15">15 min</option>
              <option value="20">20 min</option>
              <option value="30">30 min</option>
              <option value="60">60 min</option>
            </select>
          </div>
        </div>

        <div className="profit controls-form__item app-block__item__elem">
          <div className="profit__label">
            <label className="profit__label-caption">
              Deal profit
              <span className="profit-persent-value"> [0.001 = 0.1%]</span>
            </label>
          </div>
          <div className="profit__values">
            <input
              type="number"
              min="0.001"
              step="0.001"
              className="profit__input"
              id="profit__input"
              name="profit__input"
              placeholder="0.001"
            />
          </div>
        </div>

        <div className="max-purch controls-form__item app-block__item__elem">
          <div className="max-purch__label">
            <label
              className="max-purch__label-caption"
              title="How much currency bot spend to create order"
            >
              {`Can spend ${this.props.currency}`}
            </label>
          </div>
          <div className="max-purch__values">
            <input
              type="number"
              min="0.001"
              step="0.001"
              className="max-purch__input"
              id="max-purch__input"
              name="max-purch__input"
              placeholder={`1.00 ${this.props.symbol}`}
            />
          </div>
        </div>

        <div className="order-life-time controls-form__item app-block__item__elem">
          <div className="order-life-time__label">
            <label
              className="order-life-time__label-caption"
              title="After a while to cancel order (min)"
            >
              Order life time
            </label>
          </div>
          <div className="order-life-time__values">
            <input
              type="number"
              min="1"
              step="1"
              className="order-life-time__input"
              id="order-life-time__input"
              name="order-life-time__input"
              placeholder="3 min"
            />
          </div>
        </div>

        <div className="divider">
          <div className="divider__caption">
            <label>Advanced options</label>
          </div>
        </div>

        <div className="take-profit app-block__item__elem">
          <div className="take-profit__label">
            <label className="take-profit__label-caption">Take profit</label>
          </div>
          <div className="take-profit__values">
            <input
              type="number"
              min="0.001"
              step="0.01"
              className="takeProfit__input"
              id="takeProfit__input"
              name="takeProfit__input"
              placeholder="#Disabled"
              disabled
            />
          </div>
        </div>

        <div className="stop-loss controls-form__item app-block__item__elem">
          <div className="stop-loss__label">
            <label className="stop-loss__label-caption">Stop-loss</label>
          </div>
          <div className="stop-loss__values">
            <input
              type="number"
              min="0.001"
              step="0.01"
              className="stopLoss__input"
              id="stopLoss__input"
              name="stopLoss__input"
              placeholder="#Disabled"
              disabled
            />
          </div>
        </div>

        <div className="use-macd controls-form__item app-block__item__elem">
          <div className="use-macd-caption">
            <div className="use-macd-caption__label ">
              <label>Use MACD</label>
            </div>
            <div className="use-macd-caption__state ">
              <input type="checkbox" disabled />
            </div>
          </div>
        </div>

        <div className="divider">
          <div className="divider__caption">
            <label>C o n t r o l s</label>
          </div>
        </div>
        <Controls
          id={this.props.id}
          trading={this.state.trading}
          showConsole={this.state.showConsole}
          toggleTrading={() => this.toggleTrading()}
          toggleConsoleView={() => this.toggleConsoleView()}
        />
      </div>
    );
  }
}

AutoTrading.prototype.toggleConsoleView = function () {
  this.setState({
    showConsole: !this.state.showConsole,
  });
};

AutoTrading.prototype.toggleTrading = function () {
  if (this.state.trading && this.botInterval) {
    this.addLog(`${now()} Bot was disactivated...`);
    clearInterval(this.botInterval);
    this.botInterval = null;
  } else {
    this.botInterval = setInterval(
      () => this.trade(this.props.currency, this.props.crypto, this.props.pair),
      3000,
    );
    this.addLog(`${now()} Bot was activated...`);
  }

  this.setState({
    trading: !this.state.trading,
  });
};

AutoTrading.prototype.addLog = function (text) {
  this.consoleText.unshift(<p>{text}</p>);
  this.setState({
    consoleText: this.consoleText,
  });
};

AutoTrading.prototype.trade = function (curr, crypto, pair) {
  if (!this.state.trading) {
    clearInterval(this.botInterval);
    this.botInterval = null;
  } else {
    const STOCK_FEE = 0.002; // Комиссия, которую берет биржа (0.002 = 0.2%)
    const API_PATH = 'https://api.exmo.com/v1/';
    const PERIOD = this.props.avgPricePeriod; // За какой период вычисляем среднюю стоимость
    const CAN_SPEND = this.props.canSpend; // Сколько тратить бабла каждый раз при покупке крипты
    const PROFIT_MARKUP = this.props.dealProfit; // Какой навар нужен с каждой сделки? (0.001 = 0.1%)
    const ORDER_LIFE_TIME = this.props.orderLifeTime; // Через сколько минут отменять неисполненный ордер на покупку крипты

    this.addLog(`Checking settings for pair ${pair}`);
    fetch(`${API_PATH}pair_settings`) // Смотрим настройки пары
      .then(res => res.json())
      .then((data) => {
        if (data.hasOwnProperty('error')) {
          this.addLog(
            `Getting pair info for ${pair} failed with error: ${data.error}`,
          );
          return null;
        }
        const CURRENCY_1_MIN_QUANTITY = data[pair].min_quantity; // Определяем минимальное кол-во крипты на закупку
        this.addLog(
          `${now()}: Success. Min quantity is ${CURRENCY_1_MIN_QUANTITY} ${crypto}`,
        );

        // Получаем все ордера
        this.addLog('Checking opened orders');
        const openedOrders = api_query('user_open_orders', {}).then(
          (res) => {
            const data = JSON.parse(res);
            console.log(data);
            if (data.hasOwnProperty('error')) {
              this.addLog(
                `Getting opened orders for ${pair} failed with error: ${
                  data.error
                }. Exit`,
              );
            } else return data;
          },
          error => error,
        );

        // Есть ли открытые ордера
        openedOrders.then(
          (orders) => {
            if (typeof orders === 'undefined') return null;
            if (typeof orders[pair] !== 'undefined') {
              // Есть ордера по этой паре
              this.addLog(`Success. Some orders on ${pair} pair`);
              const buyOrders = [];
              for (const order of orders[pair]) {
                // Есть ли ордера на продажу
                if (order.type === 'sell') {
                  // Есть ордера на продажу, выходим
                  this.addLog('Quit. Waiting opened sell orders to be done.');
                  return null;
                }
                // Запоминаем ордера на покупку
                buyOrders.push(order);
              }

              // Есть ли ордера на покупку
              if (buyOrders.length > 0) {
                // Ордера на покупку есть
                this.addLog(`Some buy orders on ${pair} pair`);
                for (const order of buyOrders) {
                  this.addLog('Ckecking buy order'); // Есть ли частично исполненные
                  api_query('order_trades', { order_id: order.order_id }) // Смотрим состояние ордера
                    .then(
                      (res) => {
                        if (res.indexOf('Error 50304') <= -1) {
                          // Частично исполнен, выходим
                          this.addLog('Quit. Wainig buy orders to be done.');
                          // return 0;
                        } else {
                          // Частично не исполнен, смотрим как давно висит
                          const now = new Date();
                          const timePassed = now.getUnixTimestamp()
                              - 0 * 60 * 60
                              - order.created;
                          if (timePassed > ORDER_LIFE_TIME * 60) {
                            // Давно висит, отменяем
                            this.addLog('Old order. Trying to cancel...');
                            api_query('order_cancel', {
                              order_id: order.order_id,
                            }).then(
                              (res) => {
                                res.result
                                  ? this.addLog('Success. Order cancelled')
                                  : this.addLog(
                                    `Cancelling order failed with error ${
                                      res.error
                                    }`,
                                  );
                              },
                              error => error,

                            );
                          } else {
                            // Нехай еще повисит
                            this.addLog(
                              `Quit. Waiting buy order to be done. Passed ${timePassed} seconds since creation.`,
                            );
                          }
                        }
                      },
                      error => error,

                    );
                }
                return null; // Общий выход

                // Ордеров на покупку нет. Едем дальше
              }
              this.addLog('Something strange is goin on.. call 911'); // До этого места никогда не дойдет, но пусть будет. Вдруг чо?
            } else {
              // Ордеров по выбранной паре нет. Создаем (если можем)
              this.addLog('No orders. Trying to create some...');
              api_query('user_info', {}).then(
                (res) => {
                  const data = JSON.parse(res);
                  // Есть ли крипта на продажу в количестве больше минимального
                  if (data.balances[crypto] >= CURRENCY_1_MIN_QUANTITY) {
                    // Есть. Продаем дороже, чем купили, с учетом комисси и навара
                    const wannaGet = CAN_SPEND + CAN_SPEND * (STOCK_FEE + PROFIT_MARKUP);
                    this.addLog(
                      `Trying to sell ${
                        data.balances[crypto]
                      }${crypto} and get ${wannaGet}${curr}`,
                    );
                    api_query(
                      'order_create', // Создаем ордер
                      {
                        pair,
                        quantity: data.balances[crypto],
                        price: wannaGet / parseFloat(data.balances[crypto]),
                        type: 'sell',
                      },
                    ).then(
                      (res) => {
                        const data = JSON.parse(res);
                        if (data.hasOwnProperty('error')) {
                          this.addLog(data.error);
                        } else {
                          this.addLog('Success! Order created.');
                        }
                      },
                      error => error,

                    );
                  } else {
                    // Если крипты маловато, пробуем докупить.
                    // Есть ли бабло?
                    if (parseFloat(data.balances[curr]) >= CAN_SPEND) {
                      // Бабло есть. Вычисляем среднюю стоимость за указанный период
                      const deals = getDeals(pair, 10000, 'buy'); // Список завершенных сделок на покупку
                      deals.then((data) => {
                        const actualDeals = data.filter((deal) => {
                          // Выбираем сделки за указанный период
                          const now = new Date();
                          const timePassed = now.getUnixTimestamp()
                              - deal.date
                              - 0 * 60 * 60; // +- время биржи, если расходится
                          return timePassed < PERIOD * 60;
                        });

                        const prices = actualDeals.map(deal => parseFloat(deal.price));

                        const avgPrice = prices.reduce((first, next) => first + next, 0)
                            / prices.length;
                        const myNeedPrice = avgPrice - avgPrice * (STOCK_FEE + PROFIT_MARKUP);
                        const myAmount = CAN_SPEND / myNeedPrice;

                        this.addLog(
                          `Trying to buy ${myAmount} ${crypto} for ${myNeedPrice} ${curr}`,
                        );
                        // Допускается ли покупка такого количества крипты?
                        if (myAmount >= CURRENCY_1_MIN_QUANTITY) {
                          // Допускается
                          api_query('order_create', {
                            pair,
                            quantity: myAmount,
                            price: myNeedPrice,
                            type: 'buy',
                          }) // Создаем ордер
                            .then(
                              (res) => {
                                const data = JSON.parse(res);
                                if (data.hasOwnProperty('error')) {
                                  this.addLog(data.error);
                                } else {
                                  this.addLog('Success! Order created.');
                                }
                              },
                              error => error,

                            );
                        } else {
                          // Маловато будет
                          this.addLog(
                            `Budget is too low. Can only buy less than ${CURRENCY_1_MIN_QUANTITY} ${crypto}`,
                          );
                          return null;
                        }
                      });
                    } else {
                      // Бабла нет.
                      this.addLog(
                        `${now()} Not enough ${curr} to start trading. Exit.`,
                      );
                      return null;
                    }
                  }
                },
                error => error,

              );
            }
          },
          error => error,

        );
      })
      .catch((err) => {
        //
        this.addLog(err);
      });
  }
};

export default AutoTrading;
