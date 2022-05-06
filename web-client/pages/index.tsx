import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import type { NextPage } from "next";
import Link from "next/link";
import ky from "ky-universal";
import { useQuery } from "react-query";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { api } from "../api";

export interface PostProps {
  id: number;
  title: string;
  author: string;
  body: string;
  category: string;
}

const Post = ({ id, title, author, body, category }: PostProps) => (
  <Card>
    <CardHeader
      avatar={<Avatar sx={{ bgcolor: red[500] }}>R</Avatar>}
      title={title}
      subheader={`${author} - ${category}`}
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
  const { data } = useQuery("post", () => api.get("post").json());

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Container>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Super ogłoszenia 101
              </Typography>
              <Button href="/login" color="inherit">
                Zaloguj się
              </Button>
              <Button color="inherit">Zarejestruj się</Button>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
      <Container>
        <Box my={2}>{JSON.stringify(data, null, 2)}</Box>
        <Box my={2}>
          <TextField variant="standard" label="Title" />
        </Box>
        <div>
          <Grid container spacing={2}>
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
      </Container>
    </>
  );
};

export default Home;
