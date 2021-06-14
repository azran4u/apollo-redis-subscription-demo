import { gql } from 'apollo-server';

const userQuery = gql`
  type Query {
    getAllUsers: [User]!
    getUsersByIds(ids: [ID]!): [User]!
  }
`;
export { userQuery };
