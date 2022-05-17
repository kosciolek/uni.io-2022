import ky from "ky-universal";

export const api = ky.create({
  prefixUrl: "http://localhost:3000/api/",
});
