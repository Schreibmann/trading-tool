import React, { Component } from 'react';
import TradingItemsList from './TradingItemsList';
import Header from './Header';
import '../assets/css/reset.css';
import '../assets/css/main.css';

const Main = () => {
  return (
    <React.Fragment>
      <Header />
      <TradingItemsList />
    </React.Fragment>
  );
};

export default Main;
