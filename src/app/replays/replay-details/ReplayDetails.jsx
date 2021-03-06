import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { withRouter } from 'react-router';

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

class ReplayDetails extends React.PureComponent {
  setDefaultPlayer = response => this.props.onPlayerChanged(response.value.data.included[0].id);

  render() {
    const {
      match,
      replay,
      uploadingUser,
      players,
      playerEntities,
      chatMessages,
      commands,
      alliesPlayers,
      axisPlayers,
      playerId
    } = this.props;

    return (
      <React.Fragment>
        <QueryReplays id={match.params.id} onSuccess={this.setDefaultPlayer} />
        <QueryChatMessages replayId={match.params.id} />
        {isDefined(playerId) && <QueryCommands playerId={playerId} />}
        {isRejected(replay.status) && <Error code={replay.status.statusCode} message={replay.status.statusText} />}
        {isPending(replay.status) && <Overlay />}
        {isFulfilled(replay.status) &&
          <React.Fragment>
            <ReplaySummary
              replay={replay.content}
              players={players.content}
              status={replay.status}
              user={uploadingUser}
            />
            <ReplayUtilities
              replay={replay.content}
              status={replay.status}
            />
            <ReplayTeam
              faction={ALLIES}
              players={alliesPlayers}
              status={replay.status}
            />
            <ReplayTeam
              faction={AXIS}
              players={axisPlayers}
              status={replay.status}
            />
            <ReplayChat
              messages={chatMessages.content}
              players={playerEntities.content}
              status={allFulfilled(chatMessages.status, players.status)}
            />
            <ReplayCommands
              commands={commands.content}
              players={players.content}
              status={allFulfilled(commands.status, players.status)}
              selected={playerId}
              onPlayerChanged={this.props.onPlayerChanged}
            />
          </React.Fragment>
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => createSelector(
  getReplays({ id: ownProps.match.params.id }),
  getReplayPlayers({ id: ownProps.match.params.id }),
  getChatMessages({ replayId: ownProps.match.params.id }),
  getCommands({ playerId: ownProps.playerId }),
  getUserEntities,
  getPlayerEntities,
  (replays, players, chatMessages, commands, users, playerEntities) => ({
    replay: { content: replays.content.first(), status: replays.status },
    uploadingUser: users.content.get(replays.content.first() && replays.content.first().user_id, { nickname: 'Anonymous' }),
    players,
    playerEntities,
    chatMessages: { content: sort(chatMessages.content, 'tick'), status: chatMessages.status },
    commands: { content: sort(commands.content, 'tick'), status: commands.status },
    alliesPlayers: filterPlayersByFaction(players.content, ALLIES),
    axisPlayers: filterPlayersByFaction(players.content, AXIS)
  })
)(state);

export default withRouter(connect(mapStateToProps)(ReplayDetails));
