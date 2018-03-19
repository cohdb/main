import React from 'react';
import numeral from 'numeral';

import { PLACEHOLDER, DEFAULT_AVATAR_URL } from '../../../utils/constants';
import { PlayerCardLink, SteamProfileLink } from '../../routing/links/Links';
import { isDefined } from '../../../utils/immutableHelpers';

export const decimalRenderer = decimals => ({ rowData, dataKey }) => {
  if (isDefined(rowData[dataKey])) {
    const decimalsFormat = new Array(decimals).fill(0).join('');
    return numeral(rowData[dataKey]).format(`0.${decimalsFormat}`);
  } else {
    return PLACEHOLDER;
  }
};

export const playerCardLinkRenderer = steamIdKey => ({ rowData, dataKey }) => {
  if (isDefined(rowData[dataKey])) {
    if (isDefined(rowData[steamIdKey])) {
      return <PlayerCardLink text={rowData[dataKey]} steamId={rowData[steamIdKey]} />;
    } else {
      return rowData[dataKey];
    }
  } else {
    return PLACEHOLDER;
  }
};

export const factionFlagRenderer = ({ rowData, dataKey }) => {
  if (isDefined(rowData[dataKey])) {
    return <img src={`https://s3.amazonaws.com/cohdb-public/${rowData[dataKey]}.jpg`} alt={rowData[dataKey]} />;
  } else {
    return PLACEHOLDER;
  }
};

export const steamProfileAvatarRenderer = steamIdKey => ({ rowData, dataKey }) => {
  if (isDefined(rowData[dataKey])) {
    const img = <img src={rowData[dataKey]} alt="profile" style={{ height: 24, width: 24 }} />;

    if (isDefined(rowData[steamIdKey])) {
      return (
        <SteamProfileLink
          text={img}
          steamId={rowData[steamIdKey]}
        />
      );
    } else {
      return img;
    }
  } else {
    return <img src={DEFAULT_AVATAR_URL} alt="profile" style={{ height: 24, width: 24 }} />;
  }
};
