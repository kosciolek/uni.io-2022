type Category = "food" | "accomodation" | "misc";
type PostType = "needs" | "offers";

interface Comment {
  id: number;
  author: string;
  date: number;
  body: string;
}

interface Post {
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

type GetPostsResponse = Omit<
  Post,
  "phone" | "email" | "address" | "description" | "comments"
>[];

type GetPostResponse = Post;
type CreatePostRequest = Omit<Post, "creationDate" | "comments" | "author">;
type UpdatePostRequest = Omit<Post, "creationDate" | "comments" | "author">;

type CreateCommentRequest = {
  postId: number;
  body: string;
};
