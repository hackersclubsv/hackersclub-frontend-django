export type PostItem = {
  id: number;
  title: string;
  creator: string;
  created: string;
};

export type PostDetails = {
  id: number;
  title: string;
  creator: string;
  created: string;
  content: string;
  comments: string[];
}

export type User = {
  id: number;
  username: String;
  email: String;
  created: String;
  avatar: String | null;
  bio: String;
  role: String;
};
