import { gql } from "apollo-server";

const userQuery = gql`
  type Query {
    getAllUsers: [User]
  }
`;
export { userQuery };
