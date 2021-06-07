import { gql } from 'apollo-server';

const postMutation = gql`
  type Mutation {
    addPost(post: PostInput!): Post
    removePost(id: ID!): Post
    editPost(id: ID!, post: PostInput!): Post
  }
`;
export { postMutation };
