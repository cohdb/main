import { Map, List } from 'immutable';

import { DEFAULT_HEADERS, INIT_STATUS } from './constants';

export const INIT_QUERY_STATE = {
  ids: new List(),
  status: INIT_STATUS
};

export const constructQuery = (...components) => components.join('/');

export const getRequestHeaders = () => ({ headers: DEFAULT_HEADERS, data: {} });

export const updateEntityScope = (keyScope, recs, key = 'id') => keyScope.merge(new Map(recs.map(rec => [rec[key], rec])));

export const updateEntityStatuses = (statuses, recs, status, key = 'id') => statuses.merge(new Map(recs.map(rec => [rec[key], status])));

// export const updateEntities = (entities, recs, status, key = 'id') => ({
//   ...entities,
//   byKey: updateEntityScope(entities.byKey, recs, key),
//   statuses: updateEntityStatuses(entities.statuses, recs, status, key)
// });

export const updateEntities = (entities, recs, key = 'id') => entities.merge(new Map(recs.map(rec => [rec[key], rec])));

export const extractEntities = (entities, queryState) => queryState.ids.map(id => entities.get(id));

export const extractIds = (recs, key = 'id') => new List(recs.map(rec => rec[key]));

const capitalsRegex = /([A-Z])/g;

export const snakeCase = str => str.replace(capitalsRegex, char => `_${char.toLowerCase()}`);

export const objectToParams = (obj) => {
  if (obj == null) return '';

  const params = [];

  new List(Object.keys(obj)).sort().forEach((key) => {
    if (obj[key] != null) {
      if (Array.isArray(obj[key]) || List.isList(obj[key])) {
        new List(obj[key]).forEach(val => params.push(`${snakeCase(key)}[]=${val}`));
      } else {
        params.push(`${snakeCase(key)}=${obj[key]}`);
      }
    }
  });

  if (params.length > 0) {
    return `?${params.join('&')}`;
  } else {
    return '';
  }
};
