import ky from "ky-universal";
import { rest } from "msw";
import { GetPostResponse, GetPostsResponse } from "../dto/types";

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
  title: "Wspólne gotowanie",
  type: "offers",
  address: "Rakietowa 48, Kraków",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
  email: "mail@mail.com",
  phone: "+48123321123",
  comments: [
    {
      author: "Kacper Nowicki",
      body: "To jest komentarz. Raz, dwa, trzy. Powtarzam - to jest komentarz.",
      date: Date.now() - 3684 * 1000 * 24,
      id: 1,
    },
    {
      author: "Kacper Nowicki",
      body: "To jest komentarz. Raz, dwa, trzy. Powtarzam - to jest komentarz.",
      date: Date.now() - 3684 * 1000 * 24,
      id: 2,
    },
    {
      author: "Kacper Nowicki",
      body: "To jest komentarz. Raz, dwa, trzy. Powtarzam - to jest komentarz.",
      date: Date.now() - 3684 * 1000 * 24,
      id: 3,
    },
  ],
};

export const handlers = [
  rest.get("*/api/post", (req, res, ctx) => {
    return res(ctx.json(posts));
  }),
  rest.get("*/api/post/:id", (req, res, ctx) => {
    const id = Number(req.params.id);

    const combined = {
      ...post,
      ...posts.find((currentPost) => currentPost.id === id),
    };

    return res(ctx.json(combined));
  }),
];
