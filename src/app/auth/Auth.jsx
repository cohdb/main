import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import qs from 'qs';

import Wrapper from '../wrapper/Wrapper';
import SteamLogo from '../logos/SteamLogo';
import { fetchAccessToken } from '../../state/session';
import { fetchMyUser } from '../../state/users';

import './Auth.css';

class Auth extends React.PureComponent {
  state = {
    redirect: false
  };

  componentDidMount = () => {
    const loginToken = this.getLoginToken();
    if (loginToken) {
      this.props.dispatch(fetchAccessToken(loginToken))
        .then(() => this.props.dispatch(fetchMyUser())
          .then(() => this.setState({ redirect: true })));
    } else {
      window.location.href = `${process.env.REACT_APP_API_URL}/users/auth/steam`;
    }
  };

  getLoginToken = () => qs.parse(this.props.location.search).login_token;

  render = () => (
    <Wrapper>
      {this.state.redirect && <Redirect to="/" />}
      <div className="dbAuth-content">
        <SteamLogo color="#f2b632" border />
        <p className="dbAuth-text">{this.getLoginToken() ? 'Logging you in...' : 'Redirecting to Steam...'}</p>
      </div>
    </Wrapper>
  );
}

export default withRouter(connect(null)(Auth));
