import React from 'react';
import { AutoSizer, List, CellMeasurer, CellMeasurerCache } from 'react-virtualized';

import Wrapper from '../../wrapper/Wrapper';
import SubHeader from '../../sub-header/SubHeader';
import Placeholder from '../../placeholder/Placeholder';
import { formatTicks } from '../../../utils/dateTimeHelpers';
import { isFulfilled } from '../../../utils/statusHelpers';
import { WEHRMACHT, OKW } from '../../../utils/constants';

import './ReplayChat.css';

const Message = ({ message, player, style }) => {
  const factionClass = player.faction === WEHRMACHT || player.faction === OKW ? 'dbReplayChat-axis' : 'dbReplayChat-allies';

  return (
    <div style={style}>
      <span className="dbReplayChat-timestamp">[{formatTicks(message.tick)}]</span> <span className={factionClass}>{player.name}</span>: {message.message}
    </div>
  );
};

const LoadingState = () => (
  <div>
    <div><Placeholder>[99:99:99] Inverse: This is a test message!</Placeholder></div>
    <div><Placeholder>[99:99:99] Inverse: If you're reading this, I love you!</Placeholder></div>
    <div><Placeholder>[99:99:99] Inverse: Like, so so soooooooo much!</Placeholder></div>
    <div><Placeholder>[99:99:99] Inverse: Like, baby it's cold outside levels of love.</Placeholder></div>
    <div><Placeholder>[99:99:99] Inverse: Minus the creepiness.</Placeholder></div>
    <div><Placeholder>[99:99:99] Inverse: Anyways, Merry Christmas!</Placeholder></div>
    <div><Placeholder>[99:99:99] Inverse: And a Haaaaaaapppppppyyyyyy Newwwww Yearrrrrrrrr!</Placeholder></div>
    <div><Placeholder>[99:99:99] Inverse: Remember Sepha vs. Drophax?</Placeholder></div>
    <div><Placeholder>[99:99:99] Inverse: Legendary Calliopes.</Placeholder></div>
    <div><Placeholder>[99:99:99] Inverse: That is allllllllllllll.</Placeholder></div>
  </div>
);

class Chat extends React.PureComponent {
  cache = new CellMeasurerCache({
    fixedWidth: true,
    minHeight: 25
  });

  rowRenderer = (messages, players) => ({ key, index, parent, style }) => {
    const record = messages.get(index, {});
    const player = players.get(record.playerId, {});

    return (
      <CellMeasurer
        cache={this.cache}
        columnIndex={0}
        key={key}
        rowIndex={index}
        parent={parent}
      >
        <Message style={style} message={record} player={player} />
      </CellMeasurer>
    );
  };

  render = () => {
    const { messages, players, status } = this.props;

    return (
      <Wrapper paddingTop={25}>
        <SubHeader title="Chat" shadow />
        <div className="dbReplayChat-card dbReplayChat-cardSmall">
          {!isFulfilled(status) && <LoadingState />}
          {
            isFulfilled(status) &&
            <AutoSizer disableHeight>
              {({ width }) => (
                <List
                  deferredMeasurementCache={this.cache}
                  height={Math.min(messages.count() * 25, 400)}
                  width={width}
                  rowCount={messages.count()}
                  rowHeight={this.cache.rowHeight}
                  rowRenderer={this.rowRenderer(messages, players)}
                />
              )}
            </AutoSizer>
          }
        </div>
      </Wrapper>
    );
  };
}

export default Chat;
