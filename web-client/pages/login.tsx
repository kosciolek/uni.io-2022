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
import Link from "next/link";

import ky from "ky-universal";
import { useQuery } from "react-query";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { api } from "../api";

const Home: NextPage = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Container>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Super ogłoszenia 101
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
      <Container>
        <Box maxWidth={500} mx={"auto"} mt={6}>
          <Paper>
            <Box p={4}>
              <form>
                <Stack spacing={2}>
                  <Typography variant="h1" fontSize="26px">
                    Logowanie
                  </Typography>
                  <TextField variant="standard" label="Email" />
                  <TextField variant="standard" label="Hasło" type="password" />
                  <div>
                    <Typography component="span" variant="body2">
                      Nie masz konta?
                    </Typography>{" "}
                    <Link href="/signup" passHref>
                      <MuiLink variant="body2">Zarejestruj się.</MuiLink>
                    </Link>
                  </div>
                  <Button>Zaloguj się</Button>
                </Stack>
              </form>
            </Box>
          </Paper>
        </Box>
      </Container>
    </>
  );
};

export default Home;
