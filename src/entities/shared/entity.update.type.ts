import { gql } from 'apollo-server';

const entityUpdateType = gql`
  type EntityUpdate {
    updated: [ID]!
    deleted: [ID]!
  }
`;

export { entityUpdateType };
