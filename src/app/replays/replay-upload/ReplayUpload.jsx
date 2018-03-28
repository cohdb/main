import React from 'react';
import { reduxForm, Field } from 'redux-form';

import AutoSubmittingFileUpload from '../../forms/auto-submitting-file-upload/AutoSubmittingFileUpload';

import './ReplayUpload.css';

const UploadButton = ({ submitting, error, submitSucceeded }) => {
  let content;

  if (submitting) {
    content = <span><i className="fa fa-circle-o-notch fa-spin" /> Parsing...</span>;
  } else if (error) {
    content = <span><i className="fa fa-close" /> {error}</span>;
  } else if (submitSucceeded) {
    content = <span><i className="fa fa-check" /> Success!</span>;
  } else {
    content = 'Upload Replay';
  }

  return <span className="dbReplayUpload">{content}</span>;
};

const ReplayUpload = props => (
  <form>
    <label>
      <UploadButton {...props} />
      <Field
        type="file"
        name="rec"
        component={AutoSubmittingFileUpload}
        handleSubmit={props.handleSubmit}
        hidden
      />
    </label>
  </form>
);

export default reduxForm({ form: 'ReplayUpload' })(ReplayUpload);
