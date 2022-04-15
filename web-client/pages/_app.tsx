import { useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { CssBaseline } from "@mui/material";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    // @ts-ignore -- todo: remove after https://github.com/tannerlinsley/react-query/issues/3476
    <QueryClientProvider client={queryClient}>
      {/* @ts-ignore -- todo: remove after https://github.com/tannerlinsley/react-query/issues/3476 */}
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
        <CssBaseline />
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
