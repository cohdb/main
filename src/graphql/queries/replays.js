import gql from 'graphql-tag';

export const REPLAY = gql`
  query FindReplay($id: ID!) {
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
  }
}
`;
