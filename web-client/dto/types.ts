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

type GetPosts = Omit<
  Post,
  "phone" | "email" | "address" | "description" | "comments"
>[];

type GetPost = Post;
type CreatePost = Omit<Post, "creationDate" | "comments" | "author">;
type UpdatePost = Omit<Post, "creationDate" | "comments" | "author">;

type CreateComment = {
  postId: number;
  body: string;
};
