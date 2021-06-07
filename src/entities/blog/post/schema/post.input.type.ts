import { gql } from 'apollo-server';

const postInput = gql`
  input PostInput {
    content: String!
    comments: [ID]!
  }
`;

export { postInput };
