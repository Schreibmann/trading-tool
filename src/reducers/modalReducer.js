import { SHOW_MODAL, HIDE_MODAL } from '../actions/types';

const initialState = {
  show: false,
  text: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        show: true,
        text: action.text,
      };
    case HIDE_MODAL:
      return initialState;
    default:
      return state;
  }
}
