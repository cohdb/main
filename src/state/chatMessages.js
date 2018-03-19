import axios from 'axios';
import { Map } from 'immutable';
import _ from 'lodash';

import { getRequestHeaders, objectToParams } from '../utils/stateHelpers';
import { handleQuery, getEntitiesSelector, getQueryScopeSelector } from '../utils/reducerHelpers';

const INITIAL_STATE = {
  entities: new Map(),
  queries: new Map()
};

const FETCH = 'chatMessages/FETCH';
const FETCH_PENDING = 'chatMessages/FETCH_PENDING';
const FETCH_REJECTED = 'chatMessages/FETCH_REJECTED';
const FETCH_FULFILLED = 'chatMessages/FETCH_FULFILLED';

export const chatMessages = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PENDING:
    case FETCH_FULFILLED:
    case FETCH_REJECTED:
      return handleQuery(action, 'chatMessage', state);

    default:
      return state;
  }
};

export default chatMessages;

// URLs
//
export const getChatMessagesUrl = (params = {}) => {
  const baseUrl = params.id ? `/chat_messages/${params.id}` : '/chat_messages';
  return `${baseUrl}${objectToParams(_.omit(params, 'id'))}`;
};

// GET
//
export const fetchChatMessages = (params = {}) => ({
  type: FETCH,
  payload: axios.get(getChatMessagesUrl(params), getRequestHeaders()),
  meta: { key: getChatMessagesUrl(params) }
});

// SELECTORS
//
export const getChatMessageEntities = getEntitiesSelector('chatMessages');

export const getChatMessages = (params = {}) => getQueryScopeSelector('chatMessages', getChatMessagesUrl(params));
