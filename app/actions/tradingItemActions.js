import { SET_CRYPTO, SET_CURRENCY } from './types';

export const setCrypto = itemId => (dispatch) => {
  dispatch({
    type: SET_CRYPTO,
    id: itemId,
  });
};

export const setCurrency = itemId => (dispatch) => {
  dispatch({
    type: SET_CURRENCY,
    id: itemId,
  });
};
