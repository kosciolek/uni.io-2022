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
import { NextPage } from "next";
import { useMutation, useQueryClient } from "react-query";
import { api } from "../../api";
import { Layout } from "../../components/layout";
import { PostEditor } from "../../components/post-editor";
import { useState } from "react";
import { useRouter } from "next/router";
import { removeNullish } from "../../utils";

export default function AddPostPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [postType, setPostType] = useState("");
  const [category, setCategory] = useState("");
  const [shortDescription, setShortDescription] = useState("");

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const mutation = useMutation(
    () =>
      api
        .post("posts", {
          method: "post",
          json: removeNullish({
            title,
            category,
            type: postType,
            shortDescription,
            phone,
            email,
            address,
            description: "Dlugi opis123",
          }),
        })
        .json(),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("posts");
        alert("Dodano ogłoszenie.");
        router.push("/");
      },
      onError: () => {
        alert("Błąd.");
      },
    }
  );

  return (
    <>
      <Head>
        <title>Dodaj ogłoszenie</title>
      </Head>
      <Layout>
        <Typography
          sx={{ marginTop: 4, marginBottom: 4 }}
          color="primary"
          variant="h4"
        >
          Dodaj ogłoszenie
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
                      <MenuItem value="needs">Potrzebuję</MenuItem>
                      <MenuItem value="offers">Oferuję</MenuItem>
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
                  Dodaj
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
