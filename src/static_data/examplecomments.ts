// export type Comment = {
//   id: number;
//   creator: string;
//   created: string;
//   postId: PostDetails["id"];
//   content: string;
// }

import { exampleuser } from "./exampleuser";

export const comments = [
  {
    id: 1,
    creator: exampleuser[1]['username'],
    created: '2023-07-16',
    postId: 1,
    content: 'Thanks for posting such helpful info!'
  },
  {
    id: 2,
    creator: exampleuser[0]['username'],
    created: '2023-07-16',
    postId: 1,
    content: 'Kudos for you!'
  }
]