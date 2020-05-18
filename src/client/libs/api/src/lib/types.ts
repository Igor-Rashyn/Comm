
export interface Profile {
  username: string;
  bio: string;
  image: string;
}

export interface User {
  email: string;
  token: string;
  username: string;
  image: string;
}

export interface ProjectListItem {
  title: string;
  description: string;
  image: string;
  category: string;
  author: Profile;
  //subscribed boolean;
  //subscribersCount: number;
  //location: string; ???? City + Country
}

export interface UserResponse {
  user: User;
}

export interface ProfileResponse {
  profile: Profile;
}