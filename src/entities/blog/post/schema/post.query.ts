import { gql } from "apollo-server";

const postQuery = gql`
  type Query {
    getAllPosts: [Post]
  }
`;
export { postQuery };
