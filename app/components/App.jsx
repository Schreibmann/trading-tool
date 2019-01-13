import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Main from './Main';
import store from '../store/store';

const App = () => (
  <Provider store={store}>
    <Main />
  </Provider>
);

export default App;
