import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchCommands } from '../../state/commands';

class QueryCommands extends React.PureComponent {
  componentDidMount = () => this.query(this.props);

  componentWillReceiveProps(nextProps) {
    if (this.props.playerId === nextProps.playerId) {
      return;
    }

    this.query(nextProps);
  }

  query = props => this.props.dispatch(fetchCommands(_.omit(props, 'dispatch')));

  render = () => null;
}

export default connect(null)(QueryCommands);
