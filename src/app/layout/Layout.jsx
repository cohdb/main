import React from 'react';

import Wrapper from '../wrapper/Wrapper';
import Nav from '../nav/Nav';
import Footer from '../footer/Footer';

import './Layout.css';

const Layout = ({ children }) => (
  <Wrapper layout>
    <Nav />
    <Wrapper content>
      {children}
    </Wrapper>
    <Footer />
  </Wrapper>
);

export default Layout;
