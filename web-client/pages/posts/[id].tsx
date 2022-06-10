import { useMemo } from "react";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { api } from "../../api";
import {
  Box,
  Typography,
  Button,
  Grid,
  Stack,
  Chip,
  Divider,
  Skeleton,
} from "@mui/material";
import Head from "next/head";
import { formatDistanceToNow } from "date-fns";
import { pl } from "date-fns/locale";
import {
  LocalPhone,
  Event,
  Category,
  Person,
  Edit,
  Home,
  AttachEmail,
  CheckCircleOutline,
} from "@mui/icons-material";
import { GetPostResponse } from "../../dto/types";
import { formatCategory, formatPostType } from "../../utils";
import { Layout } from "../../components/layout";
import { PostEditor } from "../../components/post-editor";
import { CommentSection } from "../../components/comment-section";
import { useUser } from "@auth0/nextjs-auth0";
import { ReportDialog } from "../../components/report-dialog";

export default function PostPage({
  id,
  postDescription,
}: {
  id: number;
  postDescription: any;
}) {
  const { data: post } = useQuery(["posts", id], () =>
    api.get(`posts/${id}`).json<GetPostResponse>()
  );

  const user = useUser();

  if (!post || user.isLoading)
    return (
      <Layout>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Skeleton variant="rectangular" height={100} />
          </Grid>
          <Grid item lg={8}>
            <Skeleton variant="rectangular" height={400} />
          </Grid>
          <Grid item lg={4}>
            <Skeleton variant="rectangular" height={400} />
          </Grid>
        </Grid>
      </Layout>
    );

  const isOwnPost = user.user?.sub === post.authorId;

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <Layout>
        <Typography color="primary" my={2} variant="body2">
          <b>{post.type === "needs" ? "Potrzebuję" : "Oferuję"}:</b>
        </Typography>
        <Typography
          color="primary"
          mb={3}
          variant="h1"
          fontSize="30px"
          gutterBottom
        >
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
            <PostEditor readOnly initialValue={postDescription} />
            <Box my={3}>
              <CommentSection postId={post.id} comments={post.comments} />
            </Box>
          </Grid>
          <Grid item sm={12} lg={4}>
            <Stack spacing={2}>
              {post.verified && (
                <Box
                  sx={(theme) => ({
                    backgroundColor: theme.palette.primary.light,
                  })}
                  color="white"
                  px={1}
                  py={0.5}
                >
                  <Typography variant="caption">Zweryfikowane</Typography>
                </Box>
              )}
              <div>
                <Stack direction="row" spacing={0.5} mb={0.5}>
                  <Person color="primary" fontSize="small" />
                  <Typography color="primary" variant="body2" gutterBottom>
                    <b>Typ ogłoszenia</b>
                  </Typography>
                </Stack>
                <Typography>{formatPostType(post.type)}</Typography>
              </div>
              <Divider />
              <div>
                <Stack direction="row" spacing={0.5} mb={0.5}>
                  <Person color="primary" fontSize="small" />
                  <Typography color="primary" variant="body2" gutterBottom>
                    <b>Autor</b>
                  </Typography>
                </Stack>
                <Typography>{post.authorNickname}</Typography>
              </div>
              <Divider />
              <div>
                <Stack direction="row" spacing={0.5} mb={1}>
                  <Category color="primary" fontSize="small" />
                  <Typography color="primary" variant="body2" gutterBottom>
                    <b>Kategoria</b>
                  </Typography>
                </Stack>
                <Chip color="primary" label={formatCategory(post.category)} />
              </div>
              <Divider />
              <div>
                <Stack direction="row" spacing={0.5} mb={0.5}>
                  <CheckCircleOutline color="primary" fontSize="small" />
                  <Typography color="primary" variant="body2" gutterBottom>
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
                  <Event color="primary" fontSize="small" />
                  <Typography color="primary" variant="body2" gutterBottom>
                    <b>Czas utworzenia</b>
                  </Typography>
                </Stack>
                <Typography>
                  {formatDistanceToNow(new Date(post.creationDate), {
                    includeSeconds: false,
                    addSuffix: true,
                    locale: pl,
                  })}
                </Typography>
              </div>
              <Divider />
              {post.phone && (
                <>
                  <div>
                    <Stack direction="row" spacing={0.5} mb={0.5}>
                      <LocalPhone color="primary" fontSize="small" />
                      <Typography color="primary" variant="body2" gutterBottom>
                        <b>Telefon</b>
                      </Typography>
                    </Stack>
                    <Typography>{post.phone}</Typography>
                  </div>
                  <Divider />
                </>
              )}

              {post.address && (
                <>
                  <div>
                    <Stack direction="row" spacing={0.5} mb={0.5}>
                      <Home color="primary" fontSize="small" />
                      <Typography color="primary" variant="body2" gutterBottom>
                        <b>Adres</b>
                      </Typography>
                    </Stack>
                    <Typography>{post.address}</Typography>
                  </div>
                  <Divider />
                </>
              )}
              {post.email && (
                <div>
                  <Stack direction="row" spacing={0.5} mb={0.5}>
                    <AttachEmail color="primary" fontSize="small" />
                    <Typography color="primary" variant="body2" gutterBottom>
                      <b>Email</b>
                    </Typography>
                  </Stack>
                  <Typography>{post.email}</Typography>
                </div>
              )}
              <Stack direction="row-reverse" spacing={1}>
                {!isOwnPost && <ReportDialog postId={post.id} />}
                {isOwnPost && (
                  <Button
                    href={`/posts/update/${post.id}`}
                    startIcon={<Edit />}
                  >
                    Edytuj
                  </Button>
                )}
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<
  { dehydratedState: unknown; id: number },
  { id: string }
> = async ({ params }) => {
  const id = Number(params?.id);
  if (isNaN(id)) throw new Error("Bad post id.");

  const client = new QueryClient();
  const post = await api.get(`posts/${id}`).json<GetPostResponse>();

  client.setQueryData(["posts", id], post);

  return {
    props: {
      dehydratedState: dehydrate(client),
      id,
      postDescription: JSON.parse(post.description),
    },
  };
};
