import React from 'react';

import Wrapper from '../../wrapper/Wrapper';
import SubHeader from '../../sub-header/SubHeader';
import BootstrapTable from '../../table/Table';
import { decimalRenderer, playerCardLinkRenderer, factionFlagRenderer, steamProfileAvatarRenderer } from '../../table/cell-renderers/cellRenderers';
import { ALLIES } from '../../../utils/constants';

import './ReplayTeam.css';

const Team = ({ faction, players, status }) => {
  const colorProp = faction === ALLIES ? { blue: true } : { red: true };
  const stripedClass = faction === ALLIES ? 'dbTable-stripedBlue' : 'dbTable-stripedRed';

  return (
    <Wrapper paddingTop={25}>
      <SubHeader title={faction} {...colorProp} />
      <div className="dbReplayTeam-card dbReplayTeam-cardSmall">
        <BootstrapTable records={players} status={status} className={stripedClass}>
          {{ dataKey: 'faction', label: '', style: { width: 32, textAlign: 'center' }, cellRenderer: factionFlagRenderer }}
          {{ dataKey: 'name', label: 'Name', style: { width: 200 }, cellRenderer: playerCardLinkRenderer('steamId') }}
          {{ dataKey: 'steamAvatarUrl', label: '', style: { width: 32 }, cellRenderer: steamProfileAvatarRenderer('steamId') }}
          {{ dataKey: 'commanderName', label: 'Commander', style: { width: 275 } }}
          {{ dataKey: 'cpm', label: 'CPM', style: { width: 64, textAlign: 'right' }, cellRenderer: decimalRenderer(2) }}
          {{ dataKey: 'items', label: 'Items' }}
        </BootstrapTable>
      </div>
    </Wrapper>
  );
};

export default Team;
