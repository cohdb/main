import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchChatMessages } from '../../state/chatMessages';

class QueryChatMessages extends React.PureComponent {
  componentDidMount = () => this.query();

  componentWillReceiveProps(nextProps) {
    if (this.props.replayId === nextProps.replayId) {
      return;
    }

    this.query();
  }

  query = () => this.props.dispatch(fetchChatMessages(_.omit(this.props, 'dispatch')));

  render = () => null;
}

export default connect(null)(QueryChatMessages);
