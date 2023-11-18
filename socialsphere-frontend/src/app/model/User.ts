export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  profilePhotoUrl: string;
  coverPhotoUrl: string;
  gender: string;
  bio: string;
  followerCount: number;
  followingCount: number;
  createdAt: string;
  updatedAt: string;
  authUser: boolean;
}
