import axios from 'axios';
import { Map } from 'immutable';

import { getEntitiesSelector, updateStateEntities, getRequestHeaders } from '../utils/reducerHelpers';
import { FETCH_FULFILLED as FETCH_REPLAYS_FULFILLED } from './replays';

const INITIAL_STATE = {
  entities: new Map()
};

const FETCH_ME = 'users/me/FETCH';
const FETCH_ME_PENDING = 'users/me/FETCH_PENDING';
const FETCH_ME_REJECTED = 'users/me/FETCH_REJECTED';
export const FETCH_ME_FULFILLED = 'users/me/FETCH_FULFILLED';

export const users = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ME_FULFILLED:
    case FETCH_REPLAYS_FULFILLED:
      return updateStateEntities(action, 'user', state);

    default:
      return state;
  }
};

export default users;

// URLs
//
const ME_URL = '/users/me';

// GET
//
export const fetchMyUser = () => ({
  type: FETCH_ME,
  payload: axios.get(ME_URL, getRequestHeaders())
});

// SELECTORS
//
export const getUserEntities = getEntitiesSelector('users');
