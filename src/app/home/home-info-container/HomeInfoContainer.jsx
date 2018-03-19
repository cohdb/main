import React from 'react';
import { Row } from 'reactstrap';

import Wrapper from '../../wrapper/Wrapper';
import HomeInfoCard from '../home-info-card/HomeInfoCard';

import './HomeInfoContainer.css';

const HomeInfoContainer = () => (
  <Wrapper paddingTop={35}>
    <Row>
      <HomeInfoCard title="Track your progress" soon>
        <b>cohdb</b> remembers every replay you've ever uploaded, and lets you look back at past games while aggregating lifetime statistics so you can watch yourself grow as a player.
      </HomeInfoCard>
      <HomeInfoCard title="Follow tournaments" soon>
        In addition to tracking user replays, <b>cohdb</b> provides coverage of special events such as tournaments and showmatches. Track competitive trends over events and patches, and pick up new build orders from the pros.
      </HomeInfoCard>
      <HomeInfoCard title="Share with friends" soon>
        Keep your profile private or open it up for everyone to see. Or if you rather, share private links to profiles or individual matches with your friends. All you need is a <b>cohdb</b> account!
      </HomeInfoCard>
    </Row>
  </Wrapper>
);

export default HomeInfoContainer;
