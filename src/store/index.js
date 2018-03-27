import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import promise from 'redux-promise-middleware';

import auth from './auth';
import reducers from '../state';

export default function (props, devEnv) {
  const composedStore = compose(
    applyMiddleware(...[promise(), thunk, auth, devEnv && createLogger()].filter(Boolean)),
    devEnv && window.devToolsExtension ? window.devToolsExtension() : f => f,
  );
  const storeCreator = composedStore(createStore);
  return storeCreator(reducers, props);
}
