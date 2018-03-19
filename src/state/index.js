import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import session from './session';
import users from './users';
import replays from './replays';
import players from './players';
import chatMessages from './chatMessages';
import commands from './commands';

const reducers = combineReducers({
  session,
  users,
  replays,
  players,
  chatMessages,
  commands,
  form: formReducer
});

export default reducers;
