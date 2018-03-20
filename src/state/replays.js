import axios from 'axios';
import { Map } from 'immutable';
import _ from 'lodash';

import { getRequestHeaders, objectToParams } from '../utils/stateHelpers';
import { CREATE_ACTION, handleQuery, getEntitiesSelector, getQueryScopeSelector } from '../utils/reducerHelpers';

const INITIAL_STATE = {
  entities: new Map(),
  queries: new Map()
};

const CREATE = 'replays/CREATE';
const CREATE_PENDING = 'replays/CREATE_PENDING';
const CREATE_REJECTED = 'replays/CREATE_REJECTED';
export const CREATE_FULFILLED = 'replays/CREATE_FULFILLED';

const FETCH = 'replays/FETCH';
export const FETCH_PENDING = 'replays/FETCH_PENDING';
export const FETCH_REJECTED = 'replays/FETCH_REJECTED';
export const FETCH_FULFILLED = 'replays/FETCH_FULFILLED';

export const replays = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PENDING:
    case FETCH_FULFILLED:
    case FETCH_REJECTED:
      return handleQuery(action, 'replay', state);

    case CREATE_FULFILLED:
      return handleQuery(action, 'replay', state, CREATE_ACTION);

    default:
      return state;
  }
};

export default replays;

// URLs
//
export const getReplayUrl = (params = {}) => {
  const baseUrl = params.id ? `/replays/${params.id}` : '/replays';
  return `${baseUrl}${objectToParams(_.omit(params, 'id'))}`;
};

// CREATE
//
export const createReplay = (rec) => {
  const data = new FormData();
  data.append('rec', rec);
  return {
    type: CREATE,
    payload: axios.post(getReplayUrl(), data),
    meta: { key: getReplayUrl({ id: ':id' }) }
  };
};

// GET
//
export const fetchReplays = (params = {}) => ({
  type: FETCH,
  payload: axios.get(getReplayUrl(params), getRequestHeaders()),
  meta: { key: getReplayUrl(params) }
});

// SELECTORS
//
export const getReplayEntities = getEntitiesSelector('replays');

export const getReplays = (params = {}) => getQueryScopeSelector('replays', getReplayUrl(params));
