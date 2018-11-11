import gql from 'graphql-tag';

export const COMMANDS_FOR_PLAYER = gql`
  query ListCommandsForPlayer($playerId: ID!, $first: Int, $cursor: ID) {
    commands(playerId: $playerId, first: $first, cursor: $cursor) {
      records {
        tick
        commandText
        commandCategory
        entityName
        x
        y
        z
      }
      meta {
        cursor
      }
    }
  }
`;
