import { IFieldResolver } from 'graphql-tools';
import { PostContext } from '../post.context';
import { PostController } from '../controller/post.controller';
import { PostInput } from '../post.model';

export const editPost: IFieldResolver<
  any,
  PostContext,
  { id: string; post: PostInput }
> = async (source, args, context, info) => {
  return await PostController.edit(args.id, args.post);
};
