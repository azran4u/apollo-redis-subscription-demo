import { gql } from 'apollo-server';

const userUpdateType = gql`
  type UserUpdate {
    updated: [ID]!
    deleted: [ID]!
  }
`;

export { userUpdateType };
