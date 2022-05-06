import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";

export interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
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
      <Container>{children}</Container>
    </>
  );
};
