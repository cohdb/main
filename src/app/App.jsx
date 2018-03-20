// import React, { Component } from 'react';
// import './App.css';
//
// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }
//
// export default App;

import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Layout from './layout/Layout';
import NotFound from './not-found/NotFound';
import Home from './home/Home';
import ReplayContainer from './replays/replay-container/ReplayContainer';

import './App.css';

const App = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/replays/:id" component={ReplayContainer} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </Router>
  </Provider>
);

export default App;

