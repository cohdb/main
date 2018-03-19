import { Map } from 'immutable';

import { getEntitiesSelector, extractData, updateStateEntities } from '../utils/reducerHelpers';
import { FETCH_FULFILLED as FETCH_REPLAYS_FULFILLED } from './replays';

const INITIAL_STATE = {
  entities: new Map()
};

export const users = (state = INITIAL_STATE, { type, payload, meta }) => {
  const data = extractData('users', payload);
  switch (type) {
    case FETCH_REPLAYS_FULFILLED:
      return updateStateEntities(data, state);

    default:
      return state;
  }
};

export default users;

export const getUserEntities = getEntitiesSelector('users');
