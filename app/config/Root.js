import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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

