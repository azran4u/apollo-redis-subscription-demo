import { IResolvers } from 'graphql-tools';
import { getAllPosts } from './query.getAllPosts.resolver';
import { addPost } from './mutation.addPost.resolver';
import { editPost } from './mutation.editPost.resolver';
import { removePost } from './mutation.removePost.resolver';

const postResolver: IResolvers = {
  Query: {
    getAllPosts,
  },
  Mutation: {
    addPost,
    removePost,
    editPost,
  },
};

export { postResolver };
