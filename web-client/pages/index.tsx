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
import { useState } from "react";
import ky from "ky-universal";
import { useQuery } from "react-query";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";

export const api = ky.create({
  prefixUrl: "/api",
});

const Post = () => (
  <Card>
    <CardHeader
      avatar={<Avatar sx={{ bgcolor: red[500] }}>R</Avatar>}
      title="Cooking classes"
      subheader="September 14, 2016"
    />
    <CardContent>
      <Typography variant="body2" color="text.secondary">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit in quasi
        tempora obcaecati magni corporis? Quod eligendi sunt eum dolore modi.
        Incidunt dolore eveniet enim repellendus odio, ipsum quia placeat!
      </Typography>
    </CardContent>
    <CardActions disableSpacing>
      <IconButton>
        <FavoriteIcon />
      </IconButton>
      <Button sx={{ marginLeft: "auto" }}>Read more</Button>
    </CardActions>
  </Card>
);

const Home: NextPage = () => {
  const { data } = useQuery("posts", () => api.get("posts").json());

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Container>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Stuff
              </Typography>
              <Button color="inherit">Zaloguj się</Button>
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
          <Grid container rowSpacing={2} columnSpacing={2}>
            <Grid item xs={4}>
              <Post />
            </Grid>
            <Grid item xs={4}>
              <Post />
            </Grid>
            <Grid item xs={4}>
              <Post />
            </Grid>
            <Grid item xs={4}>
              <Post />
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default Home;
