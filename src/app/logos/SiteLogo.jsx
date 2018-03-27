import React from 'react';

import './Logo.css';

const Logo = ({ color, border = false, pulse = false }) => (
  <svg className={`${border && 'dbLogo-border'} ${pulse && 'dbLogo-pulse'}`} width={border ? 74 : 50} height={border ? 74 : 50} viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
    <path d="M896 768q237 0 443-43t325-127v170q0 69-103 128t-280 93.5-385 34.5-385-34.5-280-93.5-103-128v-170q119 84 325 127t443 43zm0 768q237 0 443-43t325-127v170q0 69-103 128t-280 93.5-385 34.5-385-34.5-280-93.5-103-128v-170q119 84 325 127t443 43zm0-384q237 0 443-43t325-127v170q0 69-103 128t-280 93.5-385 34.5-385-34.5-280-93.5-103-128v-170q119 84 325 127t443 43zm0-1152q208 0 385 34.5t280 93.5 103 128v128q0 69-103 128t-280 93.5-385 34.5-385-34.5-280-93.5-103-128v-128q0-69 103-128t280-93.5 385-34.5z" fill={color} />
  </svg>
);

export default Logo;
