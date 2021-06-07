export interface User {
  id: string;
  name: string;
  age: number;
  posts: string[];
}

export interface UserInput extends Omit<User, 'id'> {}
