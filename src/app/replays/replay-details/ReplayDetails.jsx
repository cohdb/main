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
import QueryReplays from '../../queries/QueryReplays';
import QueryChatMessages from '../../queries/QueryChatMessages';
import QueryCommands from '../../queries/QueryCommands';
import ReplaySummary from '../replay-summary/ReplaySummary';
import ReplayTeam from '../replay-team/ReplayTeam';
import ReplayChat from '../replay-chat/ReplayChat';
import ReplayCommands from '../replay-commands/ReplayCommands';
import { filterPlayersByFaction } from '../../../utils/playerHelpers';
import { sort, isDefined } from '../../../utils/immutableHelpers';
import { allFulfilled } from '../../../utils/statusHelpers';

class Replay extends React.PureComponent {
  setDefaultPlayer = response => this.props.onPlayerChanged(response.value.data.players[0].id);

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
      <div>
        <QueryReplays id={match.params.id} onSuccess={this.setDefaultPlayer} />
        <QueryChatMessages replayId={match.params.id} />
        {isDefined(playerId) && <QueryCommands playerId={playerId} />}
        <ReplaySummary
          replay={replay.content}
          players={players.content}
          status={replay.status}
          user={uploadingUser}
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
        <ReplayCommands commands={commands.content} status={commands.status} />
      </div>
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
    uploadingUser: users.content.get(replays.content.first() && replays.content.first().id, { nickname: 'Anonymous' }),
    players,
    playerEntities,
    chatMessages: { content: sort(chatMessages.content, 'tick'), status: chatMessages.status },
    commands: { content: sort(commands.content, 'tick'), status: commands.status },
    alliesPlayers: filterPlayersByFaction(players.content, ALLIES),
    axisPlayers: filterPlayersByFaction(players.content, AXIS)
  })
)(state);

export default withRouter(connect(mapStateToProps)(Replay));
