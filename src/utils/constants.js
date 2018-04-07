export const DEFAULT_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/vnd.api+json'
};

export const PLACEHOLDER = '--';

export const DEFAULT_AVATAR_URL = 'https://s3.amazonaws.com/cohdb-public/avatar_default.jpg';

export const INIT_STATUS = 'INIT';
export const PENDING_STATUS = 'PENDING';
export const REJECTED_STATUS = 'REJECTED';
export const FULFILLED_STATUS = 'FULFILLED';

export const ALLIES = 'allies';
export const AXIS = 'axis';

export const SOVIET = 'soviet';
export const USF = 'aef';
export const BRITISH = 'british';
export const OKW = 'west_german';
export const WEHRMACHT = 'german';

export const ALLIES_FACTIONS = [SOVIET, USF, BRITISH];
export const AXIS_FACTIONS = [OKW, WEHRMACHT];

export const ALL_CATEGORIES = 'All Commands';
export const MOVEMENT = 'Movement';
export const UNITS = 'Units';
export const STRUCTURES = 'Structures';
export const UPGRADES = 'Upgrades';
export const ABILITIES = 'Abilities';
export const COMMANDER = 'Commander';
export const RETREAT = 'Retreat';
export const REINFORCE = 'Reinforce';

export const COMMAND_CATEGORY_COLOURS = {
  [ALL_CATEGORIES]: 'rgba(28, 36, 45, 0.25)',
  [MOVEMENT]: 'rgba(28, 36, 45, 0.25)',
  [UNITS]: 'rgba(0, 104, 139, 0.75)',
  [STRUCTURES]: 'rgba(139, 69, 19, 0.5)',
  [UPGRADES]: 'rgba(0, 97, 28, 0.5)',
  [ABILITIES]: 'rgba(251, 236, 93, 0.25)',
  [COMMANDER]: 'rgba(153, 0, 153, 0.5)',
  [RETREAT]: 'rgba(166, 42, 42, 0.5)',
  [REINFORCE]: 'rgba(54, 219, 202, 0.25)'
};
