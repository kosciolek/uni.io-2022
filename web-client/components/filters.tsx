import { FilterList } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Collapse,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { removeNullish } from "../utils";

export interface Filters {
  title?: string;
  includeFinished?: boolean;
  verifiedOnly?: boolean;
}

export interface FiltersProps {
  filters: Filters;
  onChange?: (filters: Filters) => void;
}

export const Filters: React.FC<FiltersProps> = ({
  filters,
  onChange: onChangeProp,
}) => {
  const [filtersOpen, setFiltersOpen] = useState(false);

  const onChange = (newFilters: Filters) =>
    onChangeProp?.(removeNullish(newFilters as any));

  return (
    <div>
      <Box>
        <Button
          startIcon={<FilterList />}
          onClick={() => setFiltersOpen((prev) => !prev)}
        >
          Filtry
        </Button>
      </Box>
      <Collapse in={filtersOpen} unmountOnExit timeout="auto">
        <div>
          <TextField
            label="Tytuł ogłoszenia"
            variant="standard"
            placeholder="Lekcje gotowania"
            value={filters.title}
            onChange={(e) => onChange({ ...filters, title: e.target.value })}
          />
        </div>

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
              value={filters.includeFinished ?? false}
              onChange={(_, newValue) =>
                onChange({ ...filters, includeFinished: newValue })
              }
              control={<Checkbox name="include-finished" />}
              label="Pokazuj zakończone"
            />
          </FormGroup>
        </FormControl>
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormLabel component="legend">Weryfikacja</FormLabel>
          <FormGroup>
            <FormControlLabel
              value={filters.verifiedOnly ?? false}
              onChange={(_, newValue) =>
                onChange({ ...filters, verifiedOnly: newValue })
              }
              control={<Checkbox name="verified-only" />}
              label="Tylko zweryfikowane"
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
              control={<Checkbox name="accommodation" />}
              label="Mieszkanie"
            />
            <FormControlLabel
              control={<Checkbox name="other" />}
              label="Inne"
            />
          </FormGroup>
        </FormControl>

        <Divider />
      </Collapse>
    </div>
  );
};
