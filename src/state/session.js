import { createSelector } from 'reselect';
import axios from 'axios';

import { getUserEntities } from './users';

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

    default:
      return state;
  }
};

export default session;

const AUTH_URL = '/auth';

export const extractTokenFromPayload = payload => payload.data.data.attributes.token;

export const fetchAccessToken = token => ({
  type: FETCH_ACCESS_TOKEN,
  payload: axios.post(AUTH_URL, { login_token: token })
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
