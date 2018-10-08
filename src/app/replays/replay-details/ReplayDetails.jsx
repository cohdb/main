import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { withRouter } from 'react-router';
import { Query } from 'react-apollo';

import { ALLIES, AXIS } from '../../../utils/constants';
import { getReplays } from '../../../state/replays';
import { getReplayPlayers, getPlayerEntities } from '../../../state/players';
import { getChatMessages } from '../../../state/chatMessages';
import { getCommands } from '../../../state/commands';
import { getUserEntities } from '../../../state/users';
import Error from '../../error/Error';
import Overlay from '../../overlay/Overlay';
import QueryReplays from '../../queries/QueryReplays';
import QueryChatMessages from '../../queries/QueryChatMessages';
import QueryCommands from '../../queries/QueryCommands';
import ReplaySummary from '../replay-summary/ReplaySummary';
import ReplayUtilities from '../replay-utilities/ReplayUtilities';
import ReplayTeam from '../replay-team/ReplayTeam';
import ReplayChat from '../replay-chat/ReplayChat';
import ReplayCommands from '../replay-commands/ReplayCommands';
import { filterPlayersByFaction } from '../../../utils/playerHelpers';
import { sort, isDefined } from '../../../utils/immutableHelpers';
import {allFulfilled, isFulfilled, isPending, isRejected} from '../../../utils/statusHelpers';
import { REPLAY } from '../../../graphql/queries/replays';
import { COMMANDS_FOR_PLAYER } from '../../../graphql/queries/commands';

class ReplayDetails extends React.PureComponent {
  state = {
    playerId: null
  };

  updateSelectedPlayer = playerId => this.setState({ playerId });

  render = () => {
    const { match } = this.props;
    const { playerId } = this.state;

    return (
      <Query query={REPLAY} variables={{ id: match.params.id }}>
        {({ loading, errors, data: { replay } }) => {
          if (!playerId && !loading) {
            this.updateSelectedPlayer(replay.players[0].id);
          }

          return (
            <React.Fragment>
              <ReplaySummary
                replay={replay}
                loading={loading && !replay}
              />
              <ReplayUtilities
                replay={replay}
                loading={loading && !replay}
              />
              <ReplayTeam
                faction={ALLIES}
                players={replay && filterPlayersByFaction(replay.players, ALLIES)}
                loading={loading && !replay}
              />
              <ReplayTeam
                faction={AXIS}
                players={replay && filterPlayersByFaction(replay.players, AXIS)}
                loading={loading && !replay}
              />
              <ReplayChat
                messages={replay && replay.chatMessages}
                players={replay && replay.players}
                loading={loading && !replay}
              />
              <Query query={COMMANDS_FOR_PLAYER} variables={{ playerId }} skip={!playerId}>
                {({ loading: commandLoading, data: commandData }) => (
                  <ReplayCommands
                    commands={commandData && commandData.commands}
                    players={replay && replay.players}
                    selected={playerId}
                    onPlayerChanged={this.updateSelectedPlayer}
                    loading={commandLoading || !playerId}
                  />
                )}
              </Query>
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(ReplayDetails);
