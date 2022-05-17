import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Head from "next/head";
import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { red } from "@mui/material/colors";
import { api } from "../api";
import { Category, GetPostsResponse } from "../dto/types";
import { formatCategory, getCategoryImage, removeNullish } from "../utils";
import { Layout } from "../components/layout";
import { Filters } from "../components/filters";
import { getSession } from "@auth0/nextjs-auth0";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export interface PostProps {
  id: number;
  title: string;
  author: string;
  body: string;
  category: Category;
  verified: boolean;
}

const Post = ({ id, title, author, body, category, verified }: PostProps) => (
  <Card>
    {verified && (
      <Box
        sx={(theme) => ({ backgroundColor: theme.palette.primary.light })}
        color="white"
        px={1}
        py={0.5}
      >
        <Typography variant="caption">Zweryfikowane</Typography>
      </Box>
    )}
    <CardHeader
      avatar={
        <Avatar src={getCategoryImage(category)} sx={{ bgcolor: red[500] }} />
      }
      title={title}
      subheader={`${author} • ${formatCategory(category)}`}
    />
    <CardContent>
      <Typography variant="body2" color="text.secondary">
        {body}
      </Typography>
    </CardContent>
    <CardActions disableSpacing>
      <Link href={`/posts/${id}`} passHref>
        <Button sx={{ marginLeft: "auto" }}>Więcej...</Button>
      </Link>
    </CardActions>
  </Card>
);

const Home: NextPage = () => {
  const [filters, setFilters] = useState<Filters>({});
  const [debouncedFilters] = useDebounce(filters, 500);

  const { data, refetch } = useQuery(
    ["posts", debouncedFilters],
    () =>
      api
        .get("posts", {
          searchParams: removeNullish({
            title: debouncedFilters.title,
          }) as any,
        })
        .json<GetPostsResponse>(),
    {
      keepPreviousData: true,
    }
  );

  return (
    <>
      <Head>
        <title>Ogłoszenia i wolontariat</title>
      </Head>
      <Layout>
        <Stack spacing={2}>
          <div>
            <Filters filters={filters} onChange={setFilters} />
          </div>
          <div>
            <Grid container spacing={3}>
              {data?.map((post) => (
                <Grid item sm={12} md={6} lg={4} key={post.id}>
                  <Post
                    id={post.id}
                    author={post.authorNickname}
                    category={post.category}
                    body={post.shortDescription}
                    title={post.title}
                    verified={post.verified}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        </Stack>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  queryClient.prefetchQuery(["posts", {}], () =>
    api.get("posts").json<GetPostsResponse>()
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Home;
