import ky from "ky-universal";
import { rest } from "msw";

const posts: GetPosts = [
  {
    author: "Hemingway",
    category: "accomodation",
    creationDate: Date.now() - 123134,
    finished: false,
    id: 2,
    shortDescription: "Doing stuff.",
    title: "Stuff",
    type: "offers",
  },
  {
    author: "Hemingway",
    category: "accomodation",
    creationDate: Date.now() - 123134,
    finished: false,
    id: 2,
    shortDescription: "Doing stuff.",
    title: "Stuff",
    type: "offers",
  },
  {
    author: "Hemingway",
    category: "accomodation",
    creationDate: Date.now() - 123134,
    finished: false,
    id: 2,
    shortDescription: "Doing stuff.",
    title: "Stuff",
    type: "offers",
  },
];

export const handlers = [
  rest.get("/api/posts", (req, res, ctx) => {
    return res(ctx.json(posts));
  }),
];
