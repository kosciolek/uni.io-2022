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
import type { NextPage } from "next";
import Link from "next/link";
import { useQuery } from "react-query";
import { red } from "@mui/material/colors";
import { api } from "../api";
import { Category, GetPostsResponse } from "../dto/types";
import { formatCategory } from "../utils";
import { Layout } from "../components/layout";
import { Filters } from "../components/filters";

export interface PostProps {
  id: number;
  title: string;
  author: string;
  body: string;
  category: Category;
}

const Post = ({ id, title, author, body, category }: PostProps) => (
  <Card>
    <CardHeader
      avatar={<Avatar sx={{ bgcolor: red[500] }}>{author[0]}</Avatar>}
      title={title}
      subheader={`${author} • ${formatCategory(category)}`}
    />
    <CardContent>
      <Typography variant="body2" color="text.secondary">
        {body}
      </Typography>
    </CardContent>
    <CardActions disableSpacing>
      <Link href={`/post/${id}`} passHref>
        <Button sx={{ marginLeft: "auto" }}>Więcej...</Button>
      </Link>
    </CardActions>
  </Card>
);

const Home: NextPage = () => {
  const { data } = useQuery("post", () =>
    api.get("post").json<GetPostsResponse>()
  );

  return (
    <Layout>
      <Stack spacing={2}>
        <div>
          <Filters />
        </div>
        <div>
          <Grid container spacing={3}>
            {data?.map((post) => (
              <Grid item sm={12} md={6} lg={4} key={post.id}>
                <Post
                  id={post.id}
                  author={post.author}
                  category={post.category}
                  body={post.shortDescription}
                  title={post.title}
                />
              </Grid>
            ))}
          </Grid>
        </div>
        <Box py={10}>{JSON.stringify(data, null, 2)}</Box>
      </Stack>
    </Layout>
  );
};

export default Home;
