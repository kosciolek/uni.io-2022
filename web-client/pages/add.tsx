import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { NextPage } from "next";

const Add: NextPage = () => (
  <Container>
    <Typography variant="h3">Dodaj ogłoszenie</Typography>

    <form>
      <Stack spacing={2}>
        <TextField variant="filled" label="Tytuł" />

        <TextField multiline variant="filled" label="Krótki opis" fullWidth />

        <FormControl fullWidth>
          <InputLabel id="category-label">Kategoria</InputLabel>
          <Select
            labelId="category-label"
            id="category-select"
            value="Lokum"
            label="Kategoria"
          >
            <MenuItem value={10}>Lokum</MenuItem>
            <MenuItem value={20}>Wyżywienie</MenuItem>
            <MenuItem value={30}>Inne</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </form>
  </Container>
);

export default Add;
