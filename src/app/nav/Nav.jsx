import React from 'react';
import { connect } from 'react-redux';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Query } from 'react-apollo';

import Wrapper from '../wrapper/Wrapper';
import { Link } from '../routing/links/Links';
import { currentUserSelector } from '../../state/session';
import { AUTH_USER } from '../../graphql/queries/users';

import './Nav.css';

const SiteNav = () => (
  <Query query={AUTH_USER}>
    {({ data: currentUser }) => (
      <header>
        <Wrapper light>
          <Navbar className="dbNav" expand="xl">
            <NavbarBrand className="dbNav-brand" tag="span"><Link to="/" text="cohdb" /></NavbarBrand>
            <Nav className="ml-auto" navbar>
              <NavItem>
                {!currentUser.id && <NavLink className="dbNav-link" tag="span"><Link to="/auth" text="Sign In with Steam" fa="steam" /></NavLink>}
                {currentUser.id && <NavLink className="dbNav-link" tag="span"><Link to="/" text={`${currentUser.name} (${currentUser.nickname})`} /></NavLink>}
              </NavItem>
            </Nav>
          </Navbar>
        </Wrapper>
      </header>
    )}
  </Query>
);

export default SiteNav;
