export type Category = "food" | "accomodation" | "misc";
export type PostType = "needs" | "offers";

export interface Comment {
  id: number;
  author: string;
  date: number;
  body: string;
}

export interface Post {
  id: number;
  author: string;
  category: Category;
  phone: string;
  email: string;
  address: string;
  title: string;
  type: PostType;
  finished: boolean;
  creationDate: number;
  shortDescription: string;
  description: string;
  comments: Comment[];
}

export type GetPostsResponse = Omit<
  Post,
  "phone" | "email" | "address" | "description" | "comments"
>[];

export type GetPostResponse = Post;
export type CreatePostRequest = Omit<
  Post,
  "creationDate" | "comments" | "author"
>;
export type UpdatePostRequest = Omit<
  Post,
  "creationDate" | "comments" | "author"
>;

export type CreateCommentRequest = {
  postId: number;
  body: string;
};
