import { makeExecutableSchema } from 'apollo-server';
import { GraphQLSchema } from 'graphql';
import { postResolver } from '../resolvers/post.resolver';
import { postInput } from './post.input.type';
import { postMutation } from './post.mutation';
import { postQuery } from './post.query';
import { postType } from './post.type';

const postSchema: GraphQLSchema = makeExecutableSchema({
  typeDefs: [postInput, postType, postQuery, postMutation],
  resolvers: postResolver,
});

export { postSchema };
