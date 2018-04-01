import React from 'react';
import { Provider, connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Overlay from './overlay/Overlay';
import Layout from './layout/Layout';
import NotFound from './not-found/NotFound';
import Home from './home/Home';
import Auth from './auth/Auth';
import ReplayContainer from './replays/replay-container/ReplayContainer';
import { loadAccessTokenFromStorage } from '../state/session';
import { fetchMyUser } from '../state/users';

import './App.css';

const Routes = () => (
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
);

class App extends React.Component {
  state = {
    authFinished: false
  };

  componentWillMount = () => {
    this.props.dispatch(loadAccessTokenFromStorage())
      .then(() => this.props.dispatch(fetchMyUser()))
      .catch(error => console.warn(error))
      .then(() => this.setState({ authFinished: true }));
  };

  render = () => (
    <Provider store={this.props.store}>
      <React.Fragment>
        {!this.state.authFinished && <Overlay full />}
        {this.state.authFinished && <Routes />}
      </React.Fragment>
    </Provider>
  );
}

export default connect(null)(App);

