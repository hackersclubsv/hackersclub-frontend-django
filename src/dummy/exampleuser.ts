import { Role } from "../types/types";

export const exampleuser = [
  {
    id: 1,
    username: 'Hacker',
    email: 'hacker@northeastern.edu',
    created: '2023-7-13',
    avatar: null,
    bio: 'Hi! I am a dummy user!',
    role: Role.member,
  },
  {
    id: 2,
    username: 'SV admin',
    email: 'member@northeastern.edu',
    created: '2023-7-16',
    avatar: null,
    bio: 'Hi, a dummy user No.2',
    role: Role.admin,
  },
];
