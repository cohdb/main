import React from 'react';

import Wrapper from '../wrapper/Wrapper';

import './NotFound.css';

const NotFound = () => (
  <Wrapper>
    <p className="dbNotFound-code">404</p>
    <p className="dbNotFound-info">Nothing found here!</p>
  </Wrapper>
);

export default NotFound;
