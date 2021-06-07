import { gql } from 'apollo-server';

const userInput = gql`
  input UserInput {
    id: ID
    name: String!
    age: Int!
    posts: [ID]!
  }
`;

export { userInput };
