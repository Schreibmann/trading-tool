import React, { Component } from "react";
import { Provider } from "react-redux";
import TradingItemsList from "./components/TradingItemsList.jsx";
import Header from "./components/Header.jsx";
import Canvas from "./components/Canvas.jsx";
import Logo from "./components/logo.jsx";
import store from "./store";
import "./view/reset.css";
import "./view/main.css";

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
