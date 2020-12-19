import { gql } from "apollo-server";

const userInput = gql`
  input UserInput {
    id: String
    name: String
  }
`;

export { userInput };
