import React from 'react';
import { List } from 'immutable';
import Select from 'react-select';

import {
  ALL_CATEGORIES,
  MOVEMENT,
  UNITS,
  STRUCTURES,
  UPGRADES,
  ABILITIES,
  COMMANDER,
  RETREAT,
  REINFORCE
} from '../../../../utils/constants';

import './CommandTypeSelect.css';

const COMMAND_TYPE_OPTIONS = [
  { label: ALL_CATEGORIES, value: ALL_CATEGORIES },
  { label: MOVEMENT, value: MOVEMENT },
  { label: UNITS, value: UNITS },
  { label: STRUCTURES, value: STRUCTURES },
  { label: UPGRADES, value: UPGRADES },
  { label: ABILITIES, value: ABILITIES },
  { label: COMMANDER, value: COMMANDER },
  { label: RETREAT, value: RETREAT },
  { label: REINFORCE, value: REINFORCE }
];

class CommandTypeSelect extends React.PureComponent {
  handleChange = option => this.props.onChange(option.value);

  render = () => (
    <Select
      className="dbSelect-command-type"
      options={COMMAND_TYPE_OPTIONS}
      onChange={this.handleChange}
      value={this.props.value}
      style={{ width: 125 }}
      clearable={false}
      deleteRemoves={false}
    />
  )
}

export default CommandTypeSelect;
