import { SHOW_API_KEYS_FORM, HIDE_API_KEYS_FORM } from './types';

export const showApiKeysForm = () => dispatch => {

      dispatch({
        type: SHOW_API_KEYS_FORM
      })
};

export const hideApiKeysForm = () => dispatch => {

      dispatch({
        type: HIDE_API_KEYS_FORM
      })
};