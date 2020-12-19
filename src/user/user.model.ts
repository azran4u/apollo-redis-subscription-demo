export interface User {
  id: string;
  name: string;
}

export interface UserInput extends Omit<User, "id"> {}
