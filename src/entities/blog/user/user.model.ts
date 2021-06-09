export interface User {
  id: string;
  name: string;
  age: number;
  posts: Ids;
}

export interface UserInput extends Omit<User, 'id'> {}

export interface UserWithAgeUpdate {
  id: string;
  age: number;
}

export type Ids = string[];
