import React from 'react';

import './SubHeader.css';

const BLUE_CODE = '#0EBFE9';
const RED_CODE = '#FF4500';
const DEFAULT_CODE = '#FFF';

const SubHeader = ({ title, blue = false, red = false, shadow = false }) => {
  let color;
  if (blue) {
    color = BLUE_CODE;
  } else if (red) {
    color = RED_CODE;
  } else {
    color = DEFAULT_CODE;
  }

  return (
    <div className="dbSubHeader">
      <h2
        className={shadow ? 'dbSubHeader-shadow' : undefined}
        style={{ color }}
      >
        {title.toUpperCase()}
      </h2>
    </div>
  );
};

export default SubHeader;
