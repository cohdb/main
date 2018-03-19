import React from 'react';

import ReplayDetails from '../replay-details/ReplayDetails';

class ReplayContainer extends React.PureComponent {
  state = {
    playerId: null
  };

  handlePlayerChange = playerId => this.setState({ playerId });

  render = () => (
    <ReplayDetails
      playerId={this.state.playerId}
      onPlayerChanged={this.handlePlayerChange}
    />
  );
}

export default ReplayContainer;
