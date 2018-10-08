import gql from 'graphql-tag';

export const COMMANDS_FOR_PLAYER = gql`
  query ListCommandsForPlayer($playerId: ID!) {
    commands(playerId: $playerId) {
      tick
      commandText
      commandCategory
      entityName
      x
      y
      z
    }
  }
`;
