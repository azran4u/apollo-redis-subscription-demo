import { makeExecutableSchema } from 'apollo-server';
import { GraphQLSchema } from 'graphql';
import { userType, userQuery } from './schema';

const userSchema: GraphQLSchema = makeExecutableSchema({
  typeDefs: [userType, userQuery],
});

export { userSchema };
