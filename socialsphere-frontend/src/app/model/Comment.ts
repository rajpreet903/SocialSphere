import { User } from './User';

export interface Comment {
  id: number;
  content: string;
  auther: User;
}
