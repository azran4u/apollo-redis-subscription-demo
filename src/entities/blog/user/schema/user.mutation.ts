import { gql } from 'apollo-server';

const userMutation = gql`
  type Mutation {
    addUser(user: UserInput!): User
    removeUser(id: ID!): User
    editUser(id: ID!, user: UserInput!): User
    changeUsers(upserted: [UserInput]!, deleted: [ID]!): Boolean!
  }
`;
export { userMutation };
