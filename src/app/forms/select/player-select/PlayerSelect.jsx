import React from 'react';
import { List } from 'immutable';
import Select from 'react-select';

import './PlayerSelect.css';

const getOptionsForPlayers = players => new List(players.map(player => ({ value: player.id, label: player.name }))).toArray();

class PlayerSelect extends React.PureComponent {
  handleChange = option => this.props.onChange(option.value);

  render = () => (
    <Select
      className="dbSelect-player"
      options={getOptionsForPlayers(this.props.players)}
      onChange={this.handleChange}
      value={this.props.value}
      style={{ width: 250 }}
      clearable={false}
      deleteRemoves={false}
    />
  )
}

export default PlayerSelect;
