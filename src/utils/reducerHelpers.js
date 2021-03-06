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
  if (payload && payload.data && payload.data.data) {
    const data = Array.isArray(payload.data.data) ? payload.data.data : [payload.data.data];
    records = records.concat(new List(data).filter(record => record.type === stateName));
  }

  if (payload && payload.data && payload.data.included) {
    const included = Array.isArray(payload.data.included) ? payload.data.included : [payload.data.included];
    records = records.concat(new List(included).filter(record => record.type === stateName));
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
  const response = payload && (payload.data || payload.request);
  const statusCode = response && response.status;
  const statusText = response && response.statusText;
  const errors = response && response.data && response.data.errors;

  if (type.includes(PENDING_STATUS)) {
    scope = { ...queries.get(key, INIT_QUERY_STATE), status: { name: PENDING_STATUS, statusCode } };
    queries = queries.set(key, scope);
  } else if (type.includes(REJECTED_STATUS)) {
    scope = { ...queries.get(key, INIT_QUERY_STATE), status: { name: REJECTED_STATUS, statusCode, statusText, errors } };
    queries = queries.set(key, scope);
  } else {
    scope = { ...queries.get(key, INIT_QUERY_STATE), status: { name: FULFILLED_STATUS, statusCode } };
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
