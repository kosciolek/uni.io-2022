import { useUser } from "@auth0/nextjs-auth0";
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Avatar,
  Toolbar,
  Typography,
  Stack,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user } = useUser();

  const authButton = user ? (
    <Button href="/api/auth/logout" color="primary">
      Wyloguj się
    </Button>
  ) : (
    <Button href="/api/auth/login" color="primary">
      Logowanie i rejestracja
    </Button>
  );

  return (
    <>
      <Container
        sx={(theme) => ({
          borderWidth: "0 4px",
          borderStyle: "dotted",
          borderColor: theme.palette.primary.light,
          height: "100vh",
        })}
      >
        <Box
          sx={(theme) => ({
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderWidth: "0 0 4px 0",
            borderStyle: "dotted",
            borderColor: theme.palette.primary.light,
          })}
          py={2}
        >
          <Link passHref href="/">
            <Box display="flex" alignItems="center" sx={{ cursor: "pointer" }}>
              <Image
                style={{ display: "inline-block" }}
                alt="logo"
                src="/logo.png"
                width={64}
                height={64}
              />

              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, marginLeft: 2 }}
                color="primary"
              >
                Humanitarius
              </Typography>
            </Box>
          </Link>

          <Box display="flex" alignItems="center">
            <Stack direction="row" spacing={1} mx={2}>
              {user?.picture && (
                <Avatar sx={{ width: 24, height: 24 }} src={user.picture} />
              )}
              {user?.nickname && <Typography>{user.name}</Typography>}
            </Stack>
            <Button href="/posts/create" color="primary">
              Dodaj
            </Button>
            {authButton}
          </Box>
        </Box>

        <Box mt={2}>{children}</Box>
      </Container>
    </>
  );
};
