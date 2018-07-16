import { ADD_TRADING_ITEM, DELETE_TRADING_ITEM } from '../actions/types';

const initialState = [{crypto: 'BTC', currency: 'USD'}];

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TRADING_ITEM:
      return [
        ...state, 
        {crypto: 'BTC', currency: 'USD'}
      ];   
    case DELETE_TRADING_ITEM:
      return [
        ...state.filter( (item, idx) => idx !== action.payload)
      ];   
    default:
      return state;
  }
}
