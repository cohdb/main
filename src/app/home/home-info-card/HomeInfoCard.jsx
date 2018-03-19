import React from 'react';
import { Col } from 'reactstrap';

import './HomeInfoCard.css';

const InfoCard = ({ title, children, soon = false }) => (
  <Col xs={12} md={4} className="dbHomeInfoCard">
    <h3 className="text-center">{title}{soon && <span className="u-super">&nbsp;soon</span>}</h3>
    <p>{children}</p>
  </Col>
);

export default InfoCard;
