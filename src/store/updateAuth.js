import axios from 'axios';

import { FETCH_ACCESS_TOKEN_FULFILLED, extractTokenFromPayload } from '../state/session';

const updateAuth = state => next => (action) => {
  if (action.type === FETCH_ACCESS_TOKEN_FULFILLED) {
    axios.defaults.headers['Authorization'] = (action.payload ? `Bearer ${extractTokenFromPayload(action.payload)}` : undefined);
  }

  next(action);
};

export default updateAuth;
