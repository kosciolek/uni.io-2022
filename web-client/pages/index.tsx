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
  Pagination,
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
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import { Welcome } from "../components/welcome";

export interface PostProps {
  id: number;
  title: string;
  author: string;
  body: string;
  category: Category;
  verified: boolean;
}

const POSTS_PER_PAGE = 12;

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
        <Avatar
          sx={{ bgColor: "transparent", borderRadius: 0 }}
          src={getCategoryImage(category)}
        />
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
  const [filters, setFilters] = useState<Filters>({
    includeFinished: false,
    verifiedOnly: false,
    categories: ["accommodation", "food", "misc"],
    postType: ["needs", "offers"],
  });
  const [debouncedFilters] = useDebounce(filters, 500);

  const { data } = useQuery(
    ["posts", debouncedFilters],
    () =>
      api
        .get("posts", {
          searchParams: removeNullish({
            title: debouncedFilters.title,
            includeFinished: debouncedFilters.includeFinished,
            verifiedOnly: debouncedFilters.verifiedOnly,
            authorPartial: debouncedFilters.author,
            categories: debouncedFilters.categories?.join(","),
            postType: debouncedFilters.postType?.join(","),
          }) as any,
        })
        .json<GetPostsResponse>(),
    {
      keepPreviousData: true,
    }
  );

  const [page, setPage] = useState(1);
  const pages = data ? Math.ceil(data.length / POSTS_PER_PAGE) : 1;

  const startIndex = POSTS_PER_PAGE * (page - 1);
  const endIndex = startIndex + POSTS_PER_PAGE;

  const paginatedPosts = useMemo(
    () => data?.slice(startIndex, endIndex),
    [data, startIndex, endIndex]
  );

  return (
    <>
      <Head>
        <title>Ogłoszenia i wolontariat</title>
      </Head>
      <Layout>
        <Welcome />
        <Stack spacing={2} id="ads">
          <div>
            <Filters filters={filters} onChange={setFilters} />
          </div>
          <div>
            <Grid container spacing={3}>
              {paginatedPosts?.map((post) => (
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
            <Box py={2} display="flex" justifyContent="center">
              <Pagination
                count={pages}
                page={page}
                onChange={(_, newPage) => setPage(newPage)}
                color="primary"
              />
            </Box>
          </div>
        </Stack>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  queryClient.prefetchQuery(["posts"], () =>
    api.get("posts").json<GetPostsResponse>()
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Home;
