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
import { Category } from "../dto/types";
import { removeNullish } from "../utils";

export interface Filters {
  title?: string;
  includeFinished?: boolean;
  verifiedOnly?: boolean;
  author?: string;
  categories?: string[];
  postType?: string[];
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

  const handleCategoryChange = (category: Category, newValue: boolean) => {
    if (newValue)
      onChange({
        ...filters,
        categories: [...(filters.categories ?? []), category],
      });
    else
      onChange({
        ...filters,
        categories: filters.categories?.filter((cat) => cat !== category),
      });
  };

  console.log(filters.postType?.includes("needs") ?? false);
  const handlePostTypeChange = (
    postType: "needs" | "offers",
    newValue: boolean
  ) => {
    if (newValue)
      onChange({
        ...filters,
        postType: [...(filters.postType ?? []), postType],
      });
    else
      onChange({
        ...filters,
        postType: filters.postType?.filter((t) => t !== postType),
      });
  };

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
        <Box mx={3} my={3}>
          <Stack direction="row" spacing={3}>
            <TextField
              label="Tytuł ogłoszenia"
              variant="standard"
              placeholder="Lekcje gotowania"
              value={filters.title}
              onChange={(e) => onChange({ ...filters, title: e.target.value })}
            />
            <TextField
              label="Autor"
              variant="standard"
              placeholder="Jan Kowalski"
              value={filters.author}
              onChange={(e) => onChange({ ...filters, author: e.target.value })}
            />
          </Stack>
        </Box>
        <Divider />
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormLabel component="legend">Typ ogłoszenia</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.postType?.includes("offers") ?? false}
                  onChange={(_, newValue) =>
                    handlePostTypeChange("offers", newValue)
                  }
                  name="offers"
                />
              }
              label="Oferuje"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.postType?.includes("needs") ?? false}
                  onChange={(_, newValue) =>
                    handlePostTypeChange("needs", newValue)
                  }
                  name="needs"
                />
              }
              label="Potrzebuje"
            />
          </FormGroup>
        </FormControl>
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormLabel component="legend">Kategoria</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.categories?.includes("food") ?? false}
                  onChange={(_, newValue) =>
                    handleCategoryChange("food", newValue)
                  }
                  name="food"
                />
              }
              label="Żywność"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={
                    filters.categories?.includes("accommodation") ?? false
                  }
                  onChange={(_, newValue) =>
                    handleCategoryChange("accommodation", newValue)
                  }
                  name="accommodation"
                />
              }
              label="Mieszkanie"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(_, newValue) =>
                    handleCategoryChange("misc", newValue)
                  }
                  checked={filters.categories?.includes("misc") ?? false}
                  name="misc"
                />
              }
              label="Inne"
            />
          </FormGroup>
        </FormControl>
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormLabel component="legend">Status ogłoszenia</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.includeFinished ?? false}
                  onChange={(_, newValue) =>
                    onChange({ ...filters, includeFinished: newValue })
                  }
                  name="include-finished"
                />
              }
              label="Pokazuj zakończone"
            />
          </FormGroup>
        </FormControl>
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormLabel component="legend">Weryfikacja</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.verifiedOnly ?? false}
                  onChange={(_, newValue) =>
                    onChange({ ...filters, verifiedOnly: newValue })
                  }
                  name="verified-only"
                />
              }
              label="Tylko zweryfikowane"
            />
          </FormGroup>
        </FormControl>

        <Divider />
      </Collapse>
    </div>
  );
};
