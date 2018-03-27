import React from 'react';

import Wrapper from '../wrapper/Wrapper';
import SiteLogo from '../logos/SiteLogo';

import './Overlay.css';

const Overlay = () => (
  <Wrapper layout className="dbOverlay">
    <SiteLogo pulse />
  </Wrapper>
);

export default Overlay;
