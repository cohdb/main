import React from 'react';

import HomeIntroHero from './home-intro-hero/HomeIntroHero';
import HomeInfoContainer from './home-info-container/HomeInfoContainer';

import './Home.css';

const Home = () => (
  <React.Fragment>
    <HomeIntroHero />
    <HomeInfoContainer />
  </React.Fragment>
);

export default Home;
