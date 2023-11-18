import { User } from './User';

export interface Post {
  id: number;
  content: string;
  postPhoto: string;
  likeCount: number;
  commentCount: number;
  author: User;
  likedByUser: boolean;
  likedUserIds: string[];
}
