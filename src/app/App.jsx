import React from 'react';
import { Provider, connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from "react-apollo";

import Overlay from './overlay/Overlay';
import Layout from './layout/Layout';
import NotFound from './not-found/NotFound';
import Home from './home/Home';
import Auth from './auth/Auth';
import ReplayContainer from './replays/replay-container/ReplayContainer';
import client from '../graphql/client';
import { loadAccessTokenFromStorage } from '../state/session';
import { fetchMyUser } from '../state/users';

import './App.css';
import ReplayDetails from './replays/replay-details/ReplayDetails';

const Routes = () => (
  <Router>
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/auth" component={Auth} />
        <Route exact path="/replays/:id" component={ReplayDetails} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  </Router>
);

const App = () => (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

export default App;

