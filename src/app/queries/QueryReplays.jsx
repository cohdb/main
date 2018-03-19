import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchReplays } from '../../state/replays';

class QueryReplays extends React.PureComponent {
  componentDidMount = () => this.query();

  componentWillReceiveProps(nextProps) {
    if (this.props.id === nextProps.id) {
      return;
    }

    this.query();
  }

  query = () => this.props.dispatch(fetchReplays(_.omit(this.props, 'dispatch', 'onSuccess'))).then(this.props.onSuccess);

  render = () => null;
}

export default connect(null)(QueryReplays);
