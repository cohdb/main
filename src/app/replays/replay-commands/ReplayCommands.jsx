import React from 'react';
import { AutoSizer, InfiniteLoader, List } from 'react-virtualized';

import Wrapper from '../../wrapper/Wrapper';
import SubHeader from '../../sub-header/SubHeader';
import Placeholder from '../../placeholder/Placeholder';
import PlayerSelect from '../../forms/select/player-select/PlayerSelect';
import CommandTypeSelect from '../../forms/select/command-type-select/CommandTypeSelect';
import { isFulfilled } from '../../../utils/statusHelpers';
import { formatTicks } from '../../../utils/dateTimeHelpers';
import { ALL_CATEGORIES, COMMAND_CATEGORY_COLOURS } from '../../../utils/constants';

import './ReplayCommands.css';

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
    <div><Placeholder>[99:99:99] Inverse: I needed more filler here.</Placeholder></div>
    <div><Placeholder>[99:99:99] Inverse: So I'm gonna spam more nonsense.</Placeholder></div>
    <div><Placeholder>[99:99:99] Inverse: I'm watching The West Wing while coding over here.</Placeholder></div>
    <div><Placeholder>[99:99:99] Inverse: Christmas episodes are always the best.</Placeholder></div>
    <div><Placeholder>[99:99:99] Inverse: I have to cancel a photo op with a goat.</Placeholder></div>
    <div><Placeholder>[99:99:99] Inverse: It's a real struggle ain't it?</Placeholder></div>
    <div><Placeholder>[99:99:99] Inverse: Tough beat everybody.</Placeholder></div>
  </div>
);

const rowRenderer = commands => ({ key, index, style }) => {
  const command = commands[index] || {};

  return (
    <div key={key} style={style}>
      <p className="dbReplayCommands" style={{ backgroundColor: COMMAND_CATEGORY_COLOURS[command.commandCategory || ALL_CATEGORIES] }}>
        <span className="dbReplayCommands-timestamp">[{formatTicks(command.tick)}]</span> {command.commandText}
      </p>
    </div>
  );
};

// const CommandList = ({ records }) => (
//   <AutoSizer disableHeight>
//     {({ width }) => (
//       <InfiniteLoader
//         isRowLoaded={}
//       >
//         <List
//           height={386}
//           width={width}
//           rowCount={records.length}
//           rowHeight={30}
//           rowRenderer={rowRenderer(records)}
//         />
//       </InfiniteLoader>
//     )}
//   </AutoSizer>
// );

const updateQuery = (previousResult, { fetchMoreResult }) => ({
  commands: {
    meta: {
      cursor: fetchMoreResult.commands.meta.cursor,
      __typename: previousResult.commands.meta.__typename
    },
    records: [...previousResult.commands.records, ...fetchMoreResult.commands.records],
    __typename: previousResult.commands.__typename
  }
});

class ReplayCommands extends React.PureComponent {
  state = {
    filter: ALL_CATEGORIES
  };

  filteredCommands = () => {
    const { commands } = this.props;
    const { filter } = this.state;

    if (filter === ALL_CATEGORIES) {
      return commands;
    } else {
      return commands.filter(command => command.commandCategory === filter);
    }
  };

  onCommandTypeFilterChanged = filter => this.setState({ filter });

  isRowLoaded = ({ index }) => !!this.props.commands[index];

  loadMoreRows = () =>
    this.props.fetchMore({
      variables: {
        cursor: this.props.meta.cursor
      },
      updateQuery: updateQuery
    });

  renderCommandList = () => (
    <AutoSizer disableHeight>
      {({ width }) => (
        <InfiniteLoader
          isRowLoaded={this.isRowLoaded}
          loadMoreRows={this.loadMoreRows}
          rowCount={999999}
        >
          {({ onRowsRendered, registerChild }) => (
            <List
              height={386}
              onRowsRendered={onRowsRendered}
              ref={registerChild}
              width={width}
              rowCount={this.props.commands.length}
              rowHeight={30}
              rowRenderer={rowRenderer(this.props.commands)}
            />
          )}
        </InfiniteLoader>
      )}
    </AutoSizer>
  );

  render = () => (
    <Wrapper paddingTop={25}>
      <SubHeader title="Commands" shadow>
        {!this.props.loading &&
          <React.Fragment>
            <CommandTypeSelect
              value={this.state.filter}
              onChange={this.onCommandTypeFilterChanged}
            />
            <PlayerSelect
              players={this.props.players}
              value={this.props.selected}
              onChange={this.props.onPlayerChanged}
            />
          </React.Fragment>}
      </SubHeader>
      <div className="dbReplayCommands-card dbReplayCommands-cardSmall">
        {(this.props.loading || !this.props.commands) && <LoadingState />}
        {!this.props.loading && this.props.commands && this.renderCommandList()}
      </div>
    </Wrapper>
  );
}

export default ReplayCommands;
