import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getAccessToken, getSession } from "@auth0/nextjs-auth0";
import httpProxyMiddleware from "next-http-proxy-middleware";
import type httpProxy from "http-proxy";

const API_URL = process.env.API_URL ?? "http://localhost:8080/";

const tryGetAccessToken = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = getSession(req, res);
  if (!session?.user) return undefined;

  const { accessToken } = await getAccessToken(req, res);
  return accessToken;
};

const handler: NextApiHandler = async (req, res) => {
  const accessToken = await tryGetAccessToken(req, res);

  return httpProxyMiddleware(req, res, {
    target: API_URL,
    onProxyInit: (proxy: httpProxy) => {
      proxy.on("proxyReq", (proxyReq) => {
        if (accessToken) {
          proxyReq.setHeader("Authorization", `Bearer ${accessToken}`);
        }
      });
    },
    pathRewrite: [
      {
        patternStr: "^/api/",
        replaceStr: "/",
      },
    ],
  });
};

export default handler;
