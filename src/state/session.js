import { createSelector } from 'reselect';
import axios from 'axios';

import { FETCH_ME_FULFILLED, getUserEntities } from './users';
import { extractData } from '../utils/reducerHelpers';

const INITIAL_STATE = {
  id: null,
  accessToken: null
};

const FETCH_ACCESS_TOKEN = 'session/accessToken/FETCH';
export const FETCH_ACCESS_TOKEN_PENDING = 'session/accessToken/FETCH_PENDING';
export const FETCH_ACCESS_TOKEN_REJECTED = 'session/accessToken/FETCH_REJECTED';
export const FETCH_ACCESS_TOKEN_FULFILLED = 'session/accessToken/FETCH_FULFILLED';

const session = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case FETCH_ACCESS_TOKEN_FULFILLED:
      return { ...state, accessToken: extractTokenFromPayload(payload) };

    case FETCH_ME_FULFILLED:
      const data = extractData('user', payload);
      return { ...state, id: data.get(0, {}).id };

    default:
      return state;
  }
};

export default session;

const AUTH_URL = '/auth';

export const extractTokenFromPayload = payload =>
  payload &&
  payload.data &&
  payload.data.data &&
  payload.data.data.attributes &&
  payload.data.data.attributes.token;

export const fetchAccessToken = token => ({
  type: FETCH_ACCESS_TOKEN,
  payload: axios.post(AUTH_URL, { login_token: token })
});

export const loadAccessTokenFromStorage = () => ({
  type: FETCH_ACCESS_TOKEN_FULFILLED,
  payload: JSON.parse(localStorage.getItem('accessToken'))
});

// SELECTORS
//
export const sessionSelector = createSelector(
  state => state.session,
  session => session
);

export const currentUserSelector = createSelector(
  sessionSelector,
  getUserEntities,
  (session, users) => ({
    currentUser: users.content.get(session.id, {})
  })
);

export const envSelector = state => ({ devEnv: sessionSelector(state).devEnv });
