import { gql } from 'apollo-server';

const postType = gql`
  type Post {
    id: ID!
    content: String!
    comments: [ID]!
  }
`;

export { postType };
