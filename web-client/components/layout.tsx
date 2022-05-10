import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";

export interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Container>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Super ogłoszenia 101
            </Typography>
            <Link href="/login" passHref>
              <Button color="inherit">Zaloguj się</Button>
            </Link>
            <Link href="/signup" passHref>
              <Button color="inherit">Zarejestruj się</Button>
            </Link>
          </Toolbar>
        </Container>
      </Box>
      <Container>{children}</Container>
    </>
  );
};
