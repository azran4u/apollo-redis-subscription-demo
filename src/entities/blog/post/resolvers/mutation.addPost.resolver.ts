import { IFieldResolver } from 'graphql-tools';
import { PostContext } from '../post.context';
import { PostController } from '../controller/post.controller';
import { PostInput } from '../post.model';

export const addPost: IFieldResolver<
  any,
  PostContext,
  { post: PostInput }
> = async (source, args, context, info) => {
  return await PostController.create(args.post);
};
