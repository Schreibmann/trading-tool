import React, { Component } from 'react';
import { Provider } from 'react-redux';
import TradingItemsList from './TradingItemsList';
import Header from './Header';
import Canvas from './Canvas';
import Logo from './logo';
import store from '../store/store';
import '../assets/css/reset.css';
import '../assets/css/main.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="container">
          <Header />
          <Canvas />
          <Logo />
          <div className="app__content">
            <TradingItemsList />
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
