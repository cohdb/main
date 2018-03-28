import React from 'react';

import Wrapper from '../wrapper/Wrapper';

import './Error.css';

const Error = ({ code, message }) => (
  <Wrapper>
    <p className="dbError-code">{code}</p>
    <p className="dbError-info">{message}</p>
  </Wrapper>
);

export default Error;
