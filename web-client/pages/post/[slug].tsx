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
import { GetPostResponse } from "../../dto/types";
import { formatCategory, formatPostType } from "../../utils";
import { Comment } from "../../components/comment";
import { Layout } from "../../components/layout";

function Posts({ id }: { id: string }) {
  const { data: post } = useQuery(["post", id], () =>
    api.get(`post/${id}`).json<GetPostResponse>()
  );

  if (!post) return null;

  return (
    <Layout>
      <Typography my={3} variant="h1" fontSize="36px" gutterBottom>
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
              <Typography variant="body2" gutterBottom>
                Typ ogłoszenia
              </Typography>
              <Typography>{formatPostType(post.type)}</Typography>
            </div>
            <Divider />
            <div>
              <Typography variant="body2">Autor</Typography>
              <Typography>{post.author}</Typography>
            </div>
            <Divider />
            <div>
              <Typography variant="body2" gutterBottom>
                Kategoria
              </Typography>
              <Chip
                size="small"
                color="primary"
                label={formatCategory(post.category)}
              />
            </div>
            <Divider />
            <div>
              <Typography variant="body2" gutterBottom>
                Status
              </Typography>
              <Typography>
                {post.finished ? "Aktywne" : "Zakończone"}
              </Typography>
            </div>
            <Divider />
            <div>
              <Typography variant="body2" gutterBottom>
                Data utworzenia
              </Typography>
              <Typography>
                {new Date(post.creationDate).toLocaleString()}
              </Typography>
            </div>
            <Divider />
            <div>
              <Typography variant="body2" gutterBottom>
                Telefon
              </Typography>
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
