import { SHOW_MODAL, HIDE_MODAL } from './types';

export const showModal = text => dispatch => {
  dispatch({
    type: SHOW_MODAL,
    text,
  });
};

export const hideModal = () => dispatch => {
  dispatch({
    type: HIDE_MODAL,
  });
};
