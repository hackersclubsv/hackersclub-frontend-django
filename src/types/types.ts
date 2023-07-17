export enum Category {
  campusInfo = 'Campus Info',
  careerdev = 'Career Dev',
  techdojo = 'Tech Dojo'
}

export enum Role {
  member = 'member',
  admin = 'admin',
}

export type PostItem = {
  id: number;
  title: string;
  creator: User['username'];
  created: string;
  updated: string;
  category:Category;
};

export type PostDetails = {
  id: number;
  title: string;
  creator: User['username'];
  created: string;
  updated: string;
  category: Category;
  content: string;
  comments: Comment[];
}

export type User = {
  id: number;
  username: String;
  email: String;
  created: String;
  avatar: String | null;
  bio: String;
  role: Role;
};

export type Comment = {
  id: number;
  creator: string;
  created: string;
  postId: PostDetails["id"];
  content: string;
}