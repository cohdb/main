import React from 'react';
import { Row, Col } from 'reactstrap';

import Wrapper from '../wrapper/Wrapper';
import { Link } from '../routing/links/Links';

import './Footer.css';

const Footer = () => (
  <footer className="dbFooter">
    <Wrapper>
      <Row>
        <Col className="d-flex justify-content-start">
          <Link
            to="/"
            text="cohdb"
            className="dbFooter-brand"
          />
          &nbsp;©&nbsp;
          <Link
            to="http://ryantaylordev.ca"
            text="ryan taylor"
            external
            newTab
          />
          &nbsp;2018
          <Link
            to="http://www.coh2.org/topic/46151/cohdb-coh2-replay-analysis-and-statistics"
            text="Report bug"
            className="ml-auto"
            external
            newTab
          />
        </Col>
      </Row>
    </Wrapper>
  </footer>
);

export default Footer;
