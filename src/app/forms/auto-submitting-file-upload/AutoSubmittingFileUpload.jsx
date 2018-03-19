import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { createReplay } from '../../../state/replays';

import './AutoSubmittingFileUpload.css';

class AutoSubmittingFileInput extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange = event => this.props.handleSubmit(_ => this.handleUpload(event.target.files[0]))();

  handleUpload = rec =>
    this.props.dispatch(createReplay(rec))
      .then(response => this.props.history.push(`/replays/${response.value.data.replays[0].id}`))
      .catch(() => console.warn('error'));

  render() {
    const { input, hidden } = this.props;
    return (
      <input type="file" className={hidden ? 'd-none' : undefined} value={input.value} onChange={this.onChange} />
    );
  }
}

export default withRouter(connect(null)(AutoSubmittingFileInput));
