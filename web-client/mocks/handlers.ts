import ky from "ky-universal";
import { rest } from "msw";

const posts: GetPostsResponse = [
  {
    author: "Hemingway",
    category: "food",
    creationDate: Date.now() - 123134,
    finished: false,
    id: 1,
    shortDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    title: "Lekcje gotowania",
    type: "offers",
  },
  {
    author: "Jarek Jakiśtam",
    category: "accomodation",
    creationDate: Date.now() - 12313432,
    finished: false,
    id: 2,
    shortDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    title: "Mieszkanie",
    type: "offers",
  },
  {
    author: "Hemingway",
    category: "food",
    creationDate: Date.now() - 123134,
    finished: false,
    id: 3,
    shortDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    title: "Praca jakaś tam",
    type: "offers",
  },
];

const post: GetPostResponse = {
  author: "Hemingway",
  category: "accomodation",
  creationDate: Date.now() - 123134,
  finished: false,
  id: 2,
  shortDescription: "Doing stuff.",
  title: "Stuff",
  type: "offers",
  address: "Rakietowa 48, Kraków",
  comments: [],
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
  email: "mail@mail.com",
  phone: "+48123321123",
};

export const handlers = [
  rest.get("*/api/post", (req, res, ctx) => {
    return res(ctx.json(posts));
  }),
  rest.get("*/api/post/:id", (req, res, ctx) => {
    return res(ctx.json(post));
  }),
];
