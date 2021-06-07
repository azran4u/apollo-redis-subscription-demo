import { gql } from 'apollo-server';

const userType = gql`
  type User {
    id: ID!
    name: String!
    age: Int!
    posts: [ID]!
  }
`;

export { userType };
