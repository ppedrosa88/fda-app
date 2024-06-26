import { FormEvent, useState } from "react";

import {
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  SelectChangeEvent,
  Box,
  Container,
  Grid,
} from "@mui/material";

import { SearchBarProps, SearchFilter } from "../utils/ts/interfaces";

export const SearchBar = ({
  onSearch,
  initialQuery = "",
}: SearchBarProps): JSX.Element => {
  const [query, setQuery] = useState(initialQuery);
  const [filter, setFilter] = useState<SearchFilter>(SearchFilter.GENERIC_NAME);

  // Function to trigger the search action
  const handleSearch = () => {
    const queryTrimmed = query.trim();
    onSearch(queryTrimmed, filter);
  };

  // Handler for when the filter selection changes
  const handleFilterChange = (e: SelectChangeEvent<SearchFilter>) => {
    setFilter(e.target.value as SearchFilter);
  };

  // Handler for form submission (triggered on "Enter" or clicking the Search button)
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <Container sx={{ backgroundColor: "white", py: 2, width: "100%" }}>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4} md={3}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="filter-label">Filter</InputLabel>
              <Select
                labelId="filter-label"
                id="filter-select"
                value={filter}
                onChange={handleFilterChange}
                label="Filter"
              >
                <MenuItem value={SearchFilter.GENERIC_NAME}>
                  Generic name
                </MenuItem>
                <MenuItem value={SearchFilter.BRAND_NAME}>Brand name</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={8} md={6}>
            <TextField
              label="Search for drugs"
              variant="outlined"
              fullWidth
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSearch}
              sx={{
                borderRadius: "4px",
                borderWidth: "1px",
                padding: "12px 16px",
              }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
