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
  Grid,
  Stack,
  Chip,
  Divider,
} from "@mui/material";
import { LocalPhone, Event, Category, Person } from "@mui/icons-material";
import { GetPostResponse } from "../../dto/types";
import { formatCategory, formatPostType } from "../../utils";
import { Comment } from "../../components/comment";
import { Layout } from "../../components/layout";
import { PostEditor } from "../../components/post-editor";

function Posts({ id }: { id: string }) {
  const { data: post } = useQuery(["post", id], () =>
    api.get(`post/${id}`).json<GetPostResponse>()
  );

  if (!post) return null;

  return (
    <Layout>
      <Typography my={1} variant="body2">
        <b>{post.type === "needs" ? "Potrzebuję" : "Oferuję"}:</b>
      </Typography>
      <Typography mb={3} variant="h1" fontSize="30px" gutterBottom>
        {post.title}
      </Typography>

      <Grid container spacing={4}>
        <Grid item lg={8}>
          <Typography variant="body2" gutterBottom>
            {post.shortDescription}
          </Typography>
          <Box my={3}>
            <Divider />
          </Box>
          <PostEditor />
          {post.description}

          <Box my={3}>
            <Typography variant="h3" fontSize="24px">
              Komentarze - {post.comments.length}
            </Typography>
            <Stack spacing={2} my={2}>
              {post.comments.map((comment) => (
                <Comment
                  author={comment.author}
                  body={comment.body}
                  date={comment.date}
                  id={comment.id}
                  key={comment.id}
                />
              ))}
            </Stack>
          </Box>
        </Grid>
        <Grid item lg={4}>
          <Stack spacing={2}>
            <div>
              <Stack direction="row" spacing={0.5} mb={0.5}>
                <Person fontSize="small" />
                <Typography variant="body2" gutterBottom>
                  <b>Typ ogłoszenia</b>
                </Typography>
              </Stack>
              <Typography>{formatPostType(post.type)}</Typography>
            </div>
            <Divider />
            <div>
              <Stack direction="row" spacing={0.5} mb={0.5}>
                <Person fontSize="small" />
                <Typography variant="body2" gutterBottom>
                  <b>Autor</b>
                </Typography>
              </Stack>
              <Typography>{post.author}</Typography>
            </div>
            <Divider />
            <div>
              <Stack direction="row" spacing={0.5} mb={1}>
                <Category fontSize="small" />
                <Typography variant="body2" gutterBottom>
                  <b>Kategoria</b>
                </Typography>
              </Stack>
              <Chip color="primary" label={formatCategory(post.category)} />
            </div>
            <Divider />
            <div>
              <Stack direction="row" spacing={0.5} mb={0.5}>
                <LocalPhone fontSize="small" />
                <Typography variant="body2" gutterBottom>
                  <b>Status</b>
                </Typography>
              </Stack>
              <Typography>
                {post.finished ? "Aktywne" : "Zakończone"}
              </Typography>
            </div>
            <Divider />
            <div>
              <Stack direction="row" spacing={0.5} mb={0.5}>
                <Event fontSize="small" />
                <Typography variant="body2" gutterBottom>
                  <b>Data utworzenia</b>
                </Typography>
              </Stack>
              <Typography>
                {new Date(post.creationDate).toLocaleString()}
              </Typography>
            </div>
            <Divider />
            <div>
              <Stack direction="row" spacing={0.5} mb={0.5}>
                <LocalPhone fontSize="small" />
                <Typography variant="body2" gutterBottom>
                  <b>Telefon</b>
                </Typography>
              </Stack>
              <Typography>{post.phone}</Typography>
            </div>
          </Stack>
        </Grid>
      </Grid>
    </Layout>
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
