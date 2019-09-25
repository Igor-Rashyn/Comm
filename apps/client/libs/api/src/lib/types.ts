
export interface Profile {
  username: string;
  image: string;
}

export interface User {
  id: string;
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