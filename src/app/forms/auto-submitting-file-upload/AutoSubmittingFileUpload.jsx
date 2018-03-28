import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { SubmissionError } from 'redux-form';

import { createReplay } from '../../../state/replays';
import { currentUserSelector } from '../../../state/session';

import './AutoSubmittingFileUpload.css';

class AutoSubmittingFileInput extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange = event => this.props.handleSubmit(_ => this.handleUpload(event.target.files[0]))();

  handleUpload = rec =>
    this.props.dispatch(createReplay(rec, this.props.currentUser))
      .then(response => this.props.history.push(`/replays/${response.value.data.data.id}`))
      .catch(() => { throw new SubmissionError({ _error: 'Error, please try again' }) });

  render() {
    const { input, hidden } = this.props;
    return (
      <input type="file" className={hidden ? 'd-none' : undefined} value={input.value} onChange={this.onChange} />
    );
  }
}

const mapStateToProps = state => currentUserSelector(state);

export default withRouter(connect(mapStateToProps)(AutoSubmittingFileInput));
