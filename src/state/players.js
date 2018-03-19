import { Map } from 'immutable';

import { extractData, handleQuery, getEntitiesSelector, getQueryScopeSelector } from '../utils/reducerHelpers';
import {
  FETCH_PENDING as FETCH_REPLAY_PENDING,
  FETCH_REJECTED as FETCH_REPLAY_REJECTED,
  FETCH_FULFILLED as FETCH_REPLAY_FULFILLED,
  getReplayUrl
} from './replays';

const INITIAL_STATE = {
  entities: new Map(),
  queries: new Map()
};

export const players = (state = INITIAL_STATE, { type, payload, meta }) => {
  const data = extractData('players', payload);
  switch (type) {
    case FETCH_REPLAY_PENDING:
    case FETCH_REPLAY_REJECTED:
    case FETCH_REPLAY_FULFILLED:
      return handleQuery(type, data, state, meta);

    default:
      return state;
  }
};

export default players;

// SELECTORS
//
export const getPlayerEntities = getEntitiesSelector('players');

export const getReplayPlayers = (params = {}) => getQueryScopeSelector('players', getReplayUrl(params));
