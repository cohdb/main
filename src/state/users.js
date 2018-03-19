import { Map } from 'immutable';

import { getEntitiesSelector, updateStateEntities } from '../utils/reducerHelpers';
import { FETCH_FULFILLED as FETCH_REPLAYS_FULFILLED } from './replays';

const INITIAL_STATE = {
  entities: new Map()
};

export const users = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_REPLAYS_FULFILLED:
      return updateStateEntities(action, 'user', state);

    default:
      return state;
  }
};

export default users;

export const getUserEntities = getEntitiesSelector('users');
