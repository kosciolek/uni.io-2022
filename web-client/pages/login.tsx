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
  Paper,
  Stack,
  TextField,
  Toolbar,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

import ky from "ky-universal";
import { useQuery } from "react-query";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { api } from "../api";
import { Layout } from "../components/layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <Box maxWidth={500} mx={"auto"} mt={12}>
        <Box p={4}>
          <Box display="flex" justifyContent="center" my={2}>
            <Image height={125} width={125} src="/helping.png" />
          </Box>
          <form>
            <Stack spacing={2}>
              <Typography variant="h1" fontSize="26px">
                Logowanie
              </Typography>
              <TextField variant="standard" label="Email" />
              <TextField variant="standard" label="Hasło" type="password" />
              <Button>Zaloguj się</Button>

              <Box textAlign="center">
                <Typography component="span" variant="body2">
                  Nie masz konta?
                </Typography>{" "}
                <Link href="/signup" passHref>
                  <MuiLink variant="body2">Zarejestruj się.</MuiLink>
                </Link>
              </Box>
            </Stack>
          </form>
        </Box>
      </Box>
    </Layout>
  );
};

export default Home;
