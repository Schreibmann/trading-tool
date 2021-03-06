import React from 'react';
import { connect } from 'react-redux';
import { deleteTradingItem } from '../actions/tradingItemsListActions';

class Graph extends React.PureComponent {
  render() {
    return (
      <div
        id={`graph-item__${this.props.id}`}
        className="graph-item app-block__item__elem"
      >
        <span
          role="button"
          className="close shadowed"
          title="Close"
          onClick={() => this.props.deleteTradingItem(this.props.id)}
        />
        <span className="pair-info">
          <strong>{`[${this.props.pair}] `}</strong>
          {`Average price (${this.props.avgPricePeriod} min): `}
          <span className="blue-text">buy</span>
          {` ${this.props.buyAvgPrice} ${this.props.symbol}, `}
          <span className="red-text">sell</span>
          {` ${this.props.sellAvgPrice} ${this.props.symbol} `}
        </span>
        <span className="refresh">
          <input
            id={`refresh_id${this.props.id}`}
            type="checkbox"
            checked={this.props.autoRefresh}
            onChange={() => this.props.toggleRefresh()}
          />
          <label htmlFor={`refresh_id${this.props.id}`} title="refresh on/off">
            autorefresh
          </label>
        </span>
        <iframe
          title={`graph-frame__${this.props.id}`}
          src={`https://exmo.me/ctrl/getTemplate?name=main_big2&para=${
            this.props.pair
          }&period=day&lang=ru`}
          vspace="0px"
          scrolling="no"
        />
        <div className="daily-volume hint-cell">
          <label>
            {`Daily volume: ${parseFloat(this.props.vol)} ${
              this.props.crypto
            }, `}
            {`${parseFloat(this.props.volCurr)} ${this.props.symbol}`}
          </label>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { deleteTradingItem },
)(Graph);
