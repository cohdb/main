import { createSelector } from 'reselect';
import { getUserEntities } from './users';

const INITIAL_STATE = {
  id: null,
};

const session = (state = INITIAL_STATE) => state;

export default session;

export const sessionSelector = createSelector(
  state => state.session,
  session => session
);

export const currentUserSelector = createSelector(
  sessionSelector,
  getUserEntities,
  (session, users) => ({
    currentUser: users.content.get(session.id, {})
  })
);

export const envSelector = state => ({ devEnv: sessionSelector(state).devEnv });
