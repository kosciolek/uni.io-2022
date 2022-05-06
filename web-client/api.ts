import ky from "ky-universal";

const API_URL = process.env.API_URL ?? "http://localhost:3000/api";

export const api = ky.create({
  prefixUrl: API_URL,
});
