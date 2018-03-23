import React from 'react';

import './SubHeader.css';

const BLUE_CODE = '#0EBFE9';
const RED_CODE = '#FF4500';
const DEFAULT_CODE = '#FFF';

const SubHeader = ({ children, title, blue = false, red = false, shadow = false }) => {
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
        className={`dbSubHeader-title ${shadow && 'dbSubHeader-shadow'}`}
        style={{ color }}
      >
        {title.toUpperCase()}
      </h2>
      {children && <div className="dbSubHeader-content">{children}</div>}
    </div>
  );
};

export default SubHeader;
