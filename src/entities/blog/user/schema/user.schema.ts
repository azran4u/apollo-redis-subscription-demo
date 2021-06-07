import { makeExecutableSchema } from 'apollo-server';
import { GraphQLSchema } from 'graphql';
import { userType, userQuery } from '.';
import { userResolver } from '../resolvers/user.resolver';
import { userInput } from './user.input.type';
import { userMutation } from './user.mutation';
import { userSubscription } from './user.subscription';

const userSchema: GraphQLSchema = makeExecutableSchema({
  typeDefs: [
    userInput,
    userType,
    userQuery,
    userMutation,
    userSubscription,
  ],
  resolvers: userResolver,
});

export { userSchema };
