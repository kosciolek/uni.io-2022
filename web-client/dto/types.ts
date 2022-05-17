export type Category = "food" | "accommodation" | "misc";
export type PostType = "needs" | "offers";

export interface Comment {
  id: number;
  authorId: string;
  authorNickname: string;
  creationDate: string;
  body: string;
}

export interface Post {
  id: number;
  authorId: string;
  authorNickname: string;
  category: Category;
  phone?: string;
  email?: string;
  title: string;
  address?: string;
  type: PostType;
  finished?: boolean;
  creationDate: string;
  shortDescription: string;
  description: string;
  updatedAt: string;
  verified: boolean;
  comments: Comment[];
}

export type GetPostsResponse = Omit<Post, "comments">[];

export type GetPostResponse = Post;
export type CreatePostRequest = Omit<
  Post,
  | "creationDate"
  | "comments"
  | "authorId"
  | "authorNickname"
  | "updatedAt"
  | "verified"
>;
export type UpdatePostRequest = CreatePostRequest;

export type CreateCommentRequest = {
  postId: number;
  body: string;
};

export type CreateMutationRequest = {
  postId: number;
  reason: string;
};
