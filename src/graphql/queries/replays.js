import gql from 'graphql-tag';

export const REPLAY = gql`
  query FindReplay($id: ID!, $withCommands: Boolean!, $playerId: ID) {
  replay(id: $id) {
    id
    version
    mapName
    length
    createdAt
    user {
      nickname
    }
    players {
      id
      steamId
      name
      commanderName
      faction
      cpm
    }
    chatMessages {
      playerId
      tick
      message
    }
    commands(playerId:$playerId) @include(if: $withCommands) {
      playerId
      tick
      commandText
      commandCategory
      entityName
      x
      y
      z
    }
  }
}
`;
