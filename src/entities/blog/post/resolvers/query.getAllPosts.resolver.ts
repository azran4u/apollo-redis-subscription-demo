import { IFieldResolver } from 'graphql-tools';
import { PostController } from '../controller/post.controller';
import { PostContext } from '../post.context';

export const getAllPosts: IFieldResolver<any, PostContext, any> = (
  source,
  args,
  context,
  info,
) => {
  return PostController.getAll();
};
