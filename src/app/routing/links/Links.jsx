import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import './Links.css';

export const PlayerCardLink = ({ text, steamId }) => (
  <Link
    to={`http://www.coh2.org/ladders/playercard/steamid/${steamId}`}
    text={text}
    external
    newTab
  />
);

export const SteamProfileLink = ({ text, steamId }) => (
  <Link
    to={`http://steamcommunity.com/profiles/${steamId}`}
    text={text}
    external
    newTab
  />
);

export const Link = ({ to, text, className, fa = null, external = false, newTab = false }) => {
  if (external) {
    const newTabProps = newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {};
    return (
      <a
        href={to}
        className={className}
        {...newTabProps}
      >
        {fa && <i className={`fa fa-${fa}`} />} {text}
      </a>
    );
  } else {
    return (
      <RouterLink
        to={to}
        className={className}
      >
        {fa && <i className={`fa fa-${fa}`} />} {text}
      </RouterLink>
    );
  }
};
