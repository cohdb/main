import React from 'react';

import SiteLogo from '../logos/SiteLogo';

import './Overlay.css';

const Overlay = ({ full = false }) => (
  <div className={full ? 'dbOverlay-full' : 'dbOverlay'}>
    <SiteLogo pulse />
  </div>
);

export default Overlay;
