import axios from 'axios';

import { FETCH_ACCESS_TOKEN_FULFILLED, extractTokenFromPayload } from '../state/session';

const auth = state => next => (action) => {
  handleTokenUpdate(action);
  handleTokenInvalidation(action);

  next(action);
};

const handleTokenUpdate = (action) => {
  if (action.type === FETCH_ACCESS_TOKEN_FULFILLED) {
    axios.defaults.headers['Authorization'] = createBearerToken(action.payload);
    localStorage.setItem('accessToken', JSON.stringify(action.payload));
  }
};

const createBearerToken = payload => (payload ? `Bearer ${extractTokenFromPayload(payload)}` : undefined);

const handleTokenInvalidation = (action) => {
  if (unauthorized(action.payload)) {
    axios.defaults.headers['Authorization'] = undefined;
    localStorage.removeItem('accessToken');
  }
};

const unauthorized = payload => payload && payload.response && payload.response.status === 401;

export default auth;
