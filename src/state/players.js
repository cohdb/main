import { Map } from 'immutable';

import { handleQuery, getEntitiesSelector, getQueryScopeSelector } from '../utils/reducerHelpers';
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

export const players = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_REPLAY_PENDING:
    case FETCH_REPLAY_REJECTED:
    case FETCH_REPLAY_FULFILLED:
      return handleQuery(action, 'player', state);

    default:
      return state;
  }
};

export default players;

// SELECTORS
//
export const getPlayerEntities = getEntitiesSelector('players');

export const getReplayPlayers = (params = {}) => getQueryScopeSelector('players', getReplayUrl(params));
