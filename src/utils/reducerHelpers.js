import { createSelector } from 'reselect';
import { List } from 'immutable';

import { INIT_QUERY_STATE, extractIds, extractEntities, updateEntities } from './stateHelpers';
import { DEFAULT_HEADERS, PENDING_STATUS, FULFILLED_STATUS, REJECTED_STATUS } from './constants';

export const getEntitiesSelector = stateName => createSelector(
  state => state[stateName].entities,
  entities => ({ content: entities })
);

export const getRequestHeaders = () => ({ headers: DEFAULT_HEADERS, data: {} });

export const extractData = (stateName, payload) => {
  if (payload && payload.data && payload.data[stateName]) {
    return new List(payload.data[stateName]);
  }
  return new List();
};

export const INDEX_ACTION = 'index';
export const UPDATE_ACTION = 'update';

export const getQueryScopeSelector = (stateName, key) => createSelector(
  state => state[stateName].entities,
  state => state[stateName].queries.get(key, INIT_QUERY_STATE),
  (entities, queryScope) => ({ content: extractEntities(entities, queryScope), status: queryScope.status })
);

export const updateStateEntities = (data, state) => ({ ...state, entities: updateEntities(state.entities, data) });

export const handleQuery = (type, data, state, meta, actionType = INDEX_ACTION) => {
  let scope;
  let queries = state.queries;
  let entities = state.entities;

  if (type.includes(PENDING_STATUS)) {
    scope = { ...queries.get(meta.key, INIT_QUERY_STATE), status: PENDING_STATUS };
    queries = queries.set(meta.key, scope);
  } else if (type.includes(REJECTED_STATUS)) {
    scope = { ...queries.get(meta.key, INIT_QUERY_STATE), status: REJECTED_STATUS };
    queries = queries.set(meta.key, scope);
  } else {
    scope = { ...queries.get(meta.key, INIT_QUERY_STATE), status: FULFILLED_STATUS };
    if (actionType === INDEX_ACTION) {
      scope = { ...scope, ids: extractIds(data) };
    } else if (actionType === UPDATE_ACTION) {
      scope = { ...scope, ids: scope.ids.concat(extractIds(data)).toSet().toList() };
    }
    queries = queries.set(meta.key, scope);
    entities = updateEntities(entities, data);
  }
  return { ...state, entities, queries };
};
