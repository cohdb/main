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
  let records = new List();
  if (payload && payload.data) {
    records = records.concat(new List(payload.data).filter(record => record.type === stateName));
  }

  if (payload && payload.includes) {
    records = records.concat(new List(payload.includes).filter(record => record.type === stateName));
  }

  return records.map(record => record.attributes);
};

export const INDEX_ACTION = 'index';
export const UPDATE_ACTION = 'update';
export const CREATE_ACTION = 'create';

export const getQueryScopeSelector = (stateName, key) => createSelector(
  state => state[stateName].entities,
  state => state[stateName].queries.get(key, INIT_QUERY_STATE),
  (entities, queryScope) => ({ content: extractEntities(entities, queryScope), status: queryScope.status })
);

export const updateStateEntities = ({ payload }, model, state) => ({ ...state, entities: updateEntities(state.entities, extractData(model, payload)) });

export const handleQuery = ({ type, payload, meta }, model, state, actionType = INDEX_ACTION) => {
  let scope;
  let queries = state.queries;
  let entities = state.entities;
  let key = meta.key;
  const data = extractData(model, payload);

  if (type.includes(PENDING_STATUS)) {
    scope = { ...queries.get(key, INIT_QUERY_STATE), status: PENDING_STATUS };
    queries = queries.set(key, scope);
  } else if (type.includes(REJECTED_STATUS)) {
    scope = { ...queries.get(key, INIT_QUERY_STATE), status: REJECTED_STATUS };
    queries = queries.set(key, scope);
  } else {
    scope = { ...queries.get(key, INIT_QUERY_STATE), status: FULFILLED_STATUS };
    if (actionType === CREATE_ACTION) {
      scope = { ...scope, ids: extractIds(data) };
      key = key.replace(':id', scope.ids.first());
    } else if (actionType === INDEX_ACTION) {
      scope = { ...scope, ids: extractIds(data) };
    } else if (actionType === UPDATE_ACTION) {
      scope = { ...scope, ids: scope.ids.concat(extractIds(data)).toSet().toList() };
    }
    queries = queries.set(key, scope);
    entities = updateEntities(entities, data);
  }
  return { ...state, entities, queries };
};
