import Link from "next/link";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { api } from "../../api";
import {
  Box,
  AppBar,
  Container,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";

function Posts({ id }: { id: string }) {
  const { data } = useQuery(["post", id], () =>
    api.get(`post/${id}`).json<GetPostResponse>()
  );

  console.log(data);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Container>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Super ogłoszenia 101
              </Typography>
              <Button color="inherit">Zaloguj się</Button>
              <Button color="inherit">Zarejestruj się</Button>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
      <Container>
        <Box my={2}>{JSON.stringify(data, null, 2)}</Box>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<
  { dehydratedState: unknown; id: string },
  { slug: string }
> = async ({ params }) => {
  if (!params?.slug) throw new Error("Post id cannot be empty.");

  const client = new QueryClient();
  await client.prefetchQuery(["post", params.slug], () =>
    api.get(`post/${params.slug}`).json<GetPostResponse>()
  );

  return {
    props: { dehydratedState: dehydrate(client), id: params.slug },
  };
};

export default Posts;
