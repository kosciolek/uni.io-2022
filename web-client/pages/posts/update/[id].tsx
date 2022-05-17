import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import Head from "next/head";
import { GetServerSideProps, NextPage } from "next";
import { useMutation, useQueryClient } from "react-query";
import { api } from "../../../api";
import { Layout } from "../../../components/layout";
import { PostEditor } from "../../../components/post-editor";
import { useState } from "react";
import { useRouter } from "next/router";
import { GetPostResponse, Post } from "../../../dto/types";
import { removeNullish } from "../../../utils";

export default function AddPostPage({ post }: { post: Post }) {
  const router = useRouter();

  const queryClient = useQueryClient();

  const [title, setTitle] = useState(post.title);
  const [postType, setPostType] = useState(post.type);
  const [category, setCategory] = useState(post.category);
  const [shortDescription, setShortDescription] = useState(
    post.shortDescription
  );

  const [phone, setPhone] = useState(post.phone);
  const [email, setEmail] = useState(post.email);
  const [address, setAddress] = useState(post.address);

  const mutation = useMutation(
    () =>
      api
        .patch(`posts/${post.id}`, {
          json: removeNullish({
            title,
            category,
            type: postType,
            shortDescription,
            description: "Dlugi opis123",
            phone,
            email,
            address,
          }),
        })
        .json(),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("posts");
        alert("Zaktualizowano ogłoszenie.");
        router.push(`/posts/${post.id}`);
      },
      onError: () => {
        alert("Błąd.");
      },
    }
  );

  return (
    <>
      <Head>
        <title>Edytuj ogłoszenie</title>
      </Head>
      <Layout>
        <Typography
          sx={{ marginTop: 4, marginBottom: 4 }}
          color="primary"
          variant="h4"
        >
          Edytuj ogłoszenie
        </Typography>
        <form>
          <Stack spacing={4}>
            <div>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    variant="standard"
                    required
                    label="Tytuł"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl required fullWidth>
                    <InputLabel required id="category-label">
                      Kategoria
                    </InputLabel>
                    <Select
                      variant="standard"
                      required
                      labelId="category-label"
                      id="category-select"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      label="Kategoria"
                    >
                      <MenuItem value="accommodation">Lokum</MenuItem>
                      <MenuItem value="food">Wyżywienie</MenuItem>
                      <MenuItem value="misc">Inne</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl required fullWidth>
                    <InputLabel required id="type-label">
                      Typ
                    </InputLabel>
                    <Select
                      variant="standard"
                      required
                      labelId="type-label"
                      id="type-select"
                      value={postType}
                      onChange={(e) => setPostType(e.target.value)}
                      label="Typ"
                    >
                      <MenuItem value="offers">Potrzebuję</MenuItem>
                      <MenuItem value="needs">Oferuję</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </div>
            <Divider />
            <div>
              <Typography color="primary" variant="h6">
                Dane kontaktowe
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    fullWidth
                    variant="standard"
                    label="Telefon"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    variant="standard"
                    label="Email"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    fullWidth
                    variant="standard"
                    label="Adres"
                  />
                </Grid>
              </Grid>
            </div>
            <Divider />
            <Typography color="primary" variant="h6">
              Opis
            </Typography>
            <TextField
              multiline
              required
              minRows={3}
              variant="filled"
              label="Krótki opis"
              fullWidth
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
            />
            <PostEditor />
            <Box display="flex" justifyContent="end">
              <Stack spacing={2} alignItems="end">
                <Button
                  sx={{ minWidth: 140 }}
                  onClick={() => mutation.mutate()}
                  variant="contained"
                  disabled={mutation.isLoading}
                >
                  Zapisz
                </Button>
                <Typography variant="body2">
                  Dodając ogłoszenie, zgadzasz się z regulaminem serwisu{" "}
                  <Link href="tos">humanitarius.pl</Link>.
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </form>
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params,
}) => {
  const id = Number(params?.id);
  if (isNaN(id)) throw new Error("Bad post id.");

  const post = await api.get(`posts/${id}`).json<GetPostResponse>();

  return {
    props: {
      post,
    },
  };
};
