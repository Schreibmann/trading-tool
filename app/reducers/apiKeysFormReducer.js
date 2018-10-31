import { SHOW_API_KEYS_FORM, HIDE_API_KEYS_FORM } from '../actions/types';

const initialState = 'notShown';

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_API_KEYS_FORM:
      return 'shown';
    case HIDE_API_KEYS_FORM:
      return initialState;
    default:
      return state;
  }
}
