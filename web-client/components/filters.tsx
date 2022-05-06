import { FilterList } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Collapse,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";

export interface FiltersProps {}

export const Filters: React.FC<FiltersProps> = ({}) => {
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <div>
      <Box display="flex" justifyContent="end">
        <Button
          startIcon={<FilterList />}
          onClick={() => setFiltersOpen((prev) => !prev)}
        >
          Filtry
        </Button>
      </Box>
      <Collapse in={filtersOpen} unmountOnExit timeout="auto">
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormLabel component="legend">Typ ogłoszenia</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox name="offers" />}
              label="Oferuje"
            />
            <FormControlLabel
              control={<Checkbox name="needs" />}
              label="Potrzebuje"
            />
          </FormGroup>
        </FormControl>
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormLabel component="legend">Status ogłoszenia</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox name="open" />}
              label="Aktywne"
            />
            <FormControlLabel
              control={<Checkbox name="finished" />}
              label="Zamknięte"
            />
          </FormGroup>
        </FormControl>
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormLabel component="legend">Kategoria</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox name="food" />}
              label="Żywność"
            />
            <FormControlLabel
              control={<Checkbox name="accomodation" />}
              label="Mieszkanie"
            />
            <FormControlLabel
              control={<Checkbox name="other" />}
              label="Inne"
            />
          </FormGroup>
        </FormControl>
        <div>
          <TextField label="Tytuł ogłoszenia" placeholder="Lekcje gotowania" />
        </div>
      </Collapse>
    </div>
  );
};
