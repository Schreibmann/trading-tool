import { combineReducers } from 'redux';
import tradingItemsListReducer from './tradingItemsListReducer';
import modalReducer from './modalReducer';
import apiKeysFormReducer from './apiKeysFormReducer'

export default combineReducers({
  tradingItemsList: tradingItemsListReducer,
  apiKeysForm: apiKeysFormReducer,
  modal: modalReducer
});
