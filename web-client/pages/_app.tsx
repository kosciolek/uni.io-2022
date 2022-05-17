import { useState } from "react";
import Head from "next/head";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { UserProvider } from "@auth0/nextjs-auth0";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "../theme";

// todo: proper emotion ssr integration

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <Head>
        <title>Ogłoszenia i wolontariat</title>
      </Head>
      <UserProvider>
        {/* @ts-ignore -- todo: remove after https://github.com/tannerlinsley/react-query/issues/3476 */}
        <QueryClientProvider client={queryClient}>
          {/* @ts-ignore -- todo: remove after https://github.com/tannerlinsley/react-query/issues/3476 */}
          <Hydrate state={pageProps.dehydratedState}>
            <ThemeProvider theme={theme}>
              <Component {...pageProps} />
              <CssBaseline />
            </ThemeProvider>
          </Hydrate>
        </QueryClientProvider>
      </UserProvider>
    </>
  );
}

export default MyApp;
