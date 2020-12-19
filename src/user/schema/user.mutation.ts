import { gql } from "apollo-server";

const userMutation = gql`
  type Mutation {
    addUser(name: String!): User
    removeUser(id: String!): User
    editUser(user: UserInput!): User
  }
`;
export { userMutation };
