import { List } from 'immutable';

import { ALLIES, AXIS, ALLIES_FACTIONS, AXIS_FACTIONS } from './constants';

export const filterPlayersByFaction = (players, faction) => {
  switch (faction) {
    case ALLIES:
      return new List(players).filter(player => ALLIES_FACTIONS.includes(player.faction));
    case AXIS:
      return new List(players).filter(player => AXIS_FACTIONS.includes(player.faction));
    default:
      return new List();
  }
};
