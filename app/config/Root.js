import React from 'react';
import {
  HashRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';
import WithBackground from '../hocs/WithBackground';
import App from '../components/App';
import Test from '../components/Test';

const Root = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={WithBackground(App)} exact />
        <Route path="/test" component={WithBackground(Test)} exact />
      </Switch>
    </Router>
  );
};

export default Root;

