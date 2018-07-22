import { ADD_TRADING_ITEM, DELETE_TRADING_ITEM, SET_CRYPTO, SET_CURRENCY } from './types';

/*
export const fetchPosts = () => dispatch => {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(posts =>
      dispatch({
        type: FETCH_POSTS,
        payload: posts
      })
    );
};

export const createPost = postData => dispatch => {
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(postData)
  })
    .then(res => res.json())
    .then(post =>
      dispatch({
        type: NEW_POST,
        payload: post
      })
    );
};
*/

export const addTradingItem = () => dispatch => {

      dispatch({
        type: ADD_TRADING_ITEM
      })
};

export const deleteTradingItem = (id) => dispatch => {

      dispatch({
        type: DELETE_TRADING_ITEM,
        payload: id
      })
};

export const setCrypto = (itemId, val) => dispatch => {

      dispatch({
        type: SET_CRYPTO,
        id: itemId,
        value: val
      })
};

export const setCurrency = (itemId, val) => dispatch => {

      dispatch({
        type: SET_CURRENCY,
        id: itemId,
        value: val
      })
};