import { Category, PostDetails } from "../types/types"
import { comments } from "./examplecomments"
import { exampleuser } from "./exampleuser"



export const exampleposts : PostDetails[] = [
  {
    id: 1,
    title: 'First Post',
    creator: exampleuser[0]['username'],
    created: '2023-7-14',
    updated: '2023-7-16',
    category: Category.campusInfo,
    content: 'Hi, this is the first post!',
    comments: comments
  },
  {
    id: 2,
    title: 'Second Post',
    creator: exampleuser[1]['username'],
    created: '2023-7-14',
    updated: '2023-7-16',
    category: Category.careerdev,
    content: 'Hi there, I\'m the admin of this site!',
    comments: [],
  },
]