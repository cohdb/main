import React from 'react';
import { Row, Col } from 'reactstrap';

import Wrapper from '../../wrapper/Wrapper';
import Placeholder from '../../placeholder/Placeholder';
import { Link } from '../../routing/links/Links';
import { isFulfilled } from '../../../utils/statusHelpers';

import './ReplayUtilities.css';

const LoadingState = () => (
  <Row>
    <Col xs={12}>
      <span><Placeholder>Download</Placeholder></span>
    </Col>
  </Row>
);

const Content = ({ replay }) => (
  <Row>
    <Col xs={12}>
      <Link
        to={replay.url}
        text="Download"
        external
      />
    </Col>
  </Row>
);

const ReplayUtilities = ({ replay, loading }) => (
  <Wrapper paddingTop={35}>
    <div className="dbReplayUtilities-card dbReplayUtilities-cardSmall dbReplayUtilities">
      {!loading && <Content replay={replay} />}
      {loading && <LoadingState />}
    </div>
  </Wrapper>
);

export default ReplayUtilities;
