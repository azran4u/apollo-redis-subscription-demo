import { Post, PostInput } from '../post.model';
import { v4 as uuidv4 } from 'uuid';
import { UserInputError } from 'apollo-server';

export class PostController {
  constructor() {}

  private static posts: Post[] = [];

  public static async getAll(): Promise<Post[]> {
    return this.posts;
  }

  public static async create(input: PostInput): Promise<Post> {
    const post: Post = {
      id: uuidv4(),
      ...input,
    };
    this.posts.push(post);
    return post;
  }

  public static async findById(id: string): Promise<Post> {
    return this.posts.find((post) => {
      post.id === id;
    });
  }

  public static async remove(id: string): Promise<Post> {
    const index = this.posts.findIndex((post) => {
      return id === post.id;
    });
    const post = this.posts[index];
    if (index > -1) {
      this.posts.splice(index, 1);
    }
    return post;
  }

  public static async edit(
    id: string,
    updatedPost: PostInput,
  ): Promise<Post> {
    const index = this.posts.findIndex((post) => {
      return id === post.id;
    });
    if (index > -1) {
      this.posts[index] = { id, ...updatedPost };
      return this.posts[index];
    } else {
      console.error(`can't edit user ${JSON.stringify(updatedPost)}`);
      throw new UserInputError('edit user arguments invalid', {
        invalidArgs: updatedPost,
      });
    }
  }
}
