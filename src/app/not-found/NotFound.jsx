import React from 'react';

import Error from '../error/Error';

import './NotFound.css';

const NotFound = () => (
  <Error code={404} message="Nothing found here!" />
);

export default NotFound;
