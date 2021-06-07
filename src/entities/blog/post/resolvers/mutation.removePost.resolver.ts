import { IFieldResolver } from 'graphql-tools';
import { PostContext } from '../post.context';
import { PostController } from '../controller/post.controller';
import { Post } from '../post.model';

export const removePost: IFieldResolver<
  any,
  PostContext,
  Pick<Post, 'id'>
> = async (source, args, context, info) => {
  return await PostController.remove(args.id);
};
