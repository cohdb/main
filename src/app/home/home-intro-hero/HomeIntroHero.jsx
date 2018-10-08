import React from 'react';
import { Row, Col } from 'reactstrap';

import Wrapper from '../../wrapper/Wrapper';
import SiteLogo from '../../logos/SiteLogo';
import ReplayUpload from '../../replays/replay-upload/ReplayUpload';

import './HomeIntroHero.css';

const HomeIntroHero = () => (
  <Wrapper light paddingTop={50} paddingBottom={25} className="dbHomeIntroHero">
    <Row>
      <Col className="text-center">
        <SiteLogo color="#f2b632" border />
      </Col>
    </Row>
    <Row>
      <Col className="text-center">
        <p>
          <span className="dbHomeIntroHero-cohdb">cohdb <span className="u-super">beta</span></span> is the home of Company of Heroes 2 replay analysis and statistics. To get started, all you have to do is upload a replay!
        </p>
      </Col>
    </Row>
    <Row>
      <Col className="text-center">
        {/*<ReplayUpload />*/}
      </Col>
    </Row>
  </Wrapper>
);

export default HomeIntroHero;
