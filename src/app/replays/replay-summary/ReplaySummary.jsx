import React from 'react';
import { Row, Col } from 'reactstrap';

import Wrapper from '../../wrapper/Wrapper';
import Placeholder from '../../placeholder/Placeholder';
import { isFulfilled } from '../../../utils/statusHelpers';
import { formatTicks, formatTimeAgo } from '../../../utils/dateTimeHelpers';
import { formatGameMode } from '../../../utils/replayHelpers';

import './ReplaySummary.css';

const LoadingState = () => (
  <Row>
    <Col xs={12} md={3}>
      <h1><Placeholder>Replay Loading</Placeholder> <small><Placeholder>vLoading</Placeholder></small></h1>
    </Col>
    <Col xs={12} md={9} className="dbReplaySummary">
      <dl>
        <dd><Placeholder>2v2</Placeholder></dd>
        <dt><Placeholder>MODE</Placeholder></dt>
      </dl>
      <dl>
        <dd><Placeholder>Test Map</Placeholder></dd>
        <dt><Placeholder>MAP</Placeholder></dt>
      </dl>
      <dl>
        <dd><Placeholder>60:00:00</Placeholder></dd>
        <dt><Placeholder>LENGTH</Placeholder></dt>
      </dl>
      <dl>
        <dd><Placeholder>2 days ago</Placeholder></dd>
        <dt><Placeholder>UPLOADED</Placeholder></dt>
      </dl>
      <dl>
        <dd><Placeholder>Inverse</Placeholder></dd>
        <dt><Placeholder>UPLOADER</Placeholder></dt>
      </dl>
    </Col>
  </Row>
);

const Content = ({ replay, players, user }) => (
  <Row>
    <Col xs={12} md={3}>
      <h1>Replay {replay.id} <small>v{replay.version}</small></h1>
    </Col>
    <Col xs={12} md={9} className="dbReplaySummary">
      <dl>
        <dd>{formatGameMode(players.count())}</dd>
        <dt>MODE</dt>
      </dl>
      <dl>
        <dd>{replay.mapName}</dd>
        <dt>MAP</dt>
      </dl>
      <dl>
        <dd>{formatTicks(replay.length)}</dd>
        <dt>LENGTH</dt>
      </dl>
      <dl>
        <dd>{formatTimeAgo(replay.createdAt)}</dd>
        <dt>UPLOADED</dt>
      </dl>
      <dl>
        <dd>{user.nickname}</dd>
        <dt>UPLOADER</dt>
      </dl>
    </Col>
  </Row>
);

const Summary = ({ replay, players, user, status }) => (
  <Wrapper paddingTop={35}>
    <div className="dbReplaySummary-card dbReplaySummary-cardSmall">
      {isFulfilled(status) && <Content replay={replay} players={players} user={user} />}
      {!isFulfilled(status) && <LoadingState />}
    </div>
  </Wrapper>
);

export default Summary;
