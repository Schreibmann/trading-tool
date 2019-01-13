import {
  ADD_TRADING_ITEM,
  DELETE_TRADING_ITEM,
  SET_CRYPTO,
  SET_CURRENCY,
} from './types';

export const addTradingItem = () => dispatch => {
  dispatch({
    type: ADD_TRADING_ITEM,
  });
};

export const deleteTradingItem = id => dispatch => {
  dispatch({
    type: DELETE_TRADING_ITEM,
    payload: id,
  });
};

export const setCrypto = (itemId, val) => dispatch => {
  dispatch({
    type: SET_CRYPTO,
    id: itemId,
    value: val,
  });
};

export const setCurrency = (itemId, val) => dispatch => {
  dispatch({
    type: SET_CURRENCY,
    id: itemId,
    value: val,
  });
};
