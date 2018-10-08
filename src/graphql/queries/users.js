import gql from 'graphql-tag';

export const AUTH_USER = gql`
  {
    me {
      id
      uid
      name
      nickname
    }
  }
`;
