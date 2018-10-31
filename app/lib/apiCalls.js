import CryptoJS from 'crypto-js';

const API_PATH = 'https://api.exmo.com/v1/';

// eslint-disable-next-line
Date.prototype.getUnixTimestamp = function () {
  return Math.round(this.getTime() / 1000);
};

const config = JSON.parse(localStorage.getItem('apiKeys')) || {
  key: '',
  secret: '',
};

function sign(message) {
  return CryptoJS.HmacSHA512(message, config.secret).toString(CryptoJS.enc.hex);
}

function serialize(obj) {
  const str = [];
  for (const p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`);
    }
  }
  return str.join('&');
}

export function api_query(methodName, data) {
  return new Promise(((resolve, reject) => {
    data.nonce = new Date().getTime();
    const xhr = new XMLHttpRequest();
    const postData = serialize(data);
    xhr.open('POST', API_PATH + methodName, true);
    xhr.setRequestHeader(
      'Content-type',
      'application/x-www-form-urlencoded; charset=UTF-8index.html',
    );
    xhr.setRequestHeader('Key', config.key);
    xhr.setRequestHeader('Sign', sign(postData));
    xhr.onload = function () {
      if (this.status === 200) {
        resolve(this.response);
      } else {
        const error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      }
    };
    xhr.onerror = function () {
      reject(new Error('Network Error'));
    };
    xhr.send(postData);
  }));
}

export function getOrderBook(pair) {
  return fetch(`${API_PATH}order_book/?pair=${pair}`)
    .then(res => res.json())
    .then(data => data[pair])
    .catch((err) => {
      console.log(err);
    });
}

export function getDeals(pair, limit, type) {
  return fetch(`${API_PATH}trades/?pair=${pair}&limit=${limit}`)
    .then(res => res.json())
    .then(data => (typeof type !== 'undefined'
      ? data[pair].filter(deal => deal[type] === type)
      : data[pair]))
    .catch((err) => {
      console.log(err);
    });
}

export function getUserInfo() {
  return api_query('user_info', {}).then(
    (res) => {
      const data = JSON.parse(res);
      return data;
    },
    error => error,
  );
}

export function getPairSummary(pair) {
  return fetch(`${API_PATH}ticker`)
    .then(res => res.json())
    .then(data => data[pair])
    .catch((err) => {
      console.log(err);
    });
}

export function getUserOrders() {
  return api_query('user_open_orders', {}).then(
    (res) => {
      const data = JSON.parse(res);
      return data;
    },
    error => error,
  );
}

export function createOrder(p, q, pr, t) {
  return api_query('order_create', {
    pair: p,
    quantity: q,
    price: pr,
    type: t,
  }).then(
    (res) => {
      const data = JSON.parse(res);
      if (data.hasOwnProperty('error')) {
        return data.error;
      } return data;
    },
    error => error,
  );
}
