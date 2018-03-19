import React from 'react';
import { connect } from 'react-redux';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

import Wrapper from '../wrapper/Wrapper';
import { Link } from '../routing/links/Links';
import { currentUserSelector } from '../../state/session';

import './Nav.css';

const SiteNav = ({ currentUser }) => (
  <header>
    <Wrapper light>
      <Navbar className="dbNav" expand="xl">
        <NavbarBrand className="dbNav-brand" tag="span"><Link to="/" text="cohdb" /></NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            {!currentUser.id && <NavLink className="dbNav-link" tag="span"><Link to="/users/auth/steam" text="Sign In with Steam" fa="steam" external /></NavLink>}
            {currentUser.id && <NavLink className="dbNav-link" tag="span"><Link to="/" text={`${currentUser.name} (${currentUser.nickname})`} /></NavLink>}
          </NavItem>
        </Nav>
      </Navbar>
    </Wrapper>
  </header>
);

const mapStateToProps = state => currentUserSelector(state);

export default connect(mapStateToProps)(SiteNav);
