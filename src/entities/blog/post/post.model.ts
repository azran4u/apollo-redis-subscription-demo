export interface Post {
  id: string;
  content: string;
  comments: string[];
}

export interface PostInput extends Omit<Post, 'id'> {}
