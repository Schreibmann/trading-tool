import {
  ADD_TRADING_ITEM,
  DELETE_TRADING_ITEM,
  SET_CRYPTO,
  SET_CURRENCY,
} from '../actions/types';

const initialState = [{ crypto: 'BTC', currency: 'USD' }];

export default function (state = initialState, action) {
<<<<<<< HEAD
=======
  const newState = state;
>>>>>>> redux-way
  switch (action.type) {
    case ADD_TRADING_ITEM:
      return [...state, { crypto: 'BTC', currency: 'USD' }];
    case DELETE_TRADING_ITEM:
      return [...state.filter((item, idx) => idx !== action.payload)];
    case SET_CRYPTO:
<<<<<<< HEAD
      const newState = state;
=======
>>>>>>> redux-way
      newState[action.id].crypto = action.value;
      return [...newState];
    case SET_CURRENCY:
      newState[action.id].currency = action.value;
      return [...newState];
    default:
      return state;
  }
}
