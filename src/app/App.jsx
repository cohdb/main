import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Layout from './layout/Layout';
import NotFound from './not-found/NotFound';
import Home from './home/Home';
import Auth from './auth/Auth';
import ReplayContainer from './replays/replay-container/ReplayContainer';

import './App.css';

const App = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/auth" component={Auth} />
          <Route exact path="/replays/:id" component={ReplayContainer} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </Router>
  </Provider>
);

export default App;

