import { makeExecutableSchema } from 'apollo-server';
import { GraphQLSchema } from 'graphql';
import { userType, userQuery } from '.';
import { userResolver } from '../resolvers/user.resolver';
import { userInput } from './user.input.type';
import { userMutation } from './user.mutation';
import {
  intRange,
  userSubscription,
  userSubscriptionFilter,
} from './user.subscription';
import { entityUpdateType } from '../../../shared/entity.update.type';

const userSchema: GraphQLSchema = makeExecutableSchema({
  typeDefs: [
    userInput,
    userType,
    userQuery,
    userMutation,
    userSubscription,
    entityUpdateType,
    userSubscriptionFilter,
    intRange,
  ],
  resolvers: [userResolver],
});

export { userSchema };
