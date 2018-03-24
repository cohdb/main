import React from 'react';
import { Provider, connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Layout from './layout/Layout';
import NotFound from './not-found/NotFound';
import Home from './home/Home';
import Auth from './auth/Auth';
import ReplayContainer from './replays/replay-container/ReplayContainer';
import { loadAccessTokenFromStorage } from '../state/session';

import './App.css';

class App extends React.Component {
  componentWillMount = () => this.props.dispatch(loadAccessTokenFromStorage());

  render = () => (
    <Provider store={this.props.store}>
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
}

export default connect(null)(App);

