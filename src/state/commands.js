import axios from 'axios';
import { Map } from 'immutable';
import _ from 'lodash';

import { getRequestHeaders, objectToParams } from '../utils/stateHelpers';
import { extractData, handleQuery, getEntitiesSelector, getQueryScopeSelector } from '../utils/reducerHelpers';

const INITIAL_STATE = {
  entities: new Map(),
  queries: new Map()
};

const FETCH = 'commands/FETCH';
const FETCH_PENDING = 'commands/FETCH_PENDING';
const FETCH_REJECTED = 'commands/FETCH_REJECTED';
const FETCH_FULFILLED = 'commands/FETCH_FULFILLED';

export const commands = (state = INITIAL_STATE, { type, payload, meta }) => {
  const data = extractData('commands', payload);
  switch (type) {
    case FETCH_PENDING:
    case FETCH_FULFILLED:
    case FETCH_REJECTED:
      return handleQuery(type, data, state, meta);

    default:
      return state;
  }
};

export default commands;

// URLs
//
export const getCommandsUrl = (params = {}) => {
  const baseUrl = params.id ? `/commands/${params.id}` : '/commands';
  return `${baseUrl}${objectToParams(_.omit(params, 'id'))}`;
};

// GET
//
export const fetchCommands = (params = {}) => ({
  type: FETCH,
  payload: axios.get(getCommandsUrl(params), getRequestHeaders()),
  meta: { key: getCommandsUrl(params) }
});

// SELECTORS
//
export const getCommandEntities = getEntitiesSelector('commands');

export const getCommands = (params = {}) => getQueryScopeSelector('commands', getCommandsUrl(params));
