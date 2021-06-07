import { gql } from 'apollo-server';

const userInput = gql`
  input UserInput {
    name: String!
    age: Int!
    posts: [ID]!
  }
`;

export { userInput };
