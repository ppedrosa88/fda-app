import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { SearchFilter } from "../utils/ts/interfaces";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<SearchFilter>(SearchFilter.GENERIC_NAME);

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} style={{ margin: "20px" }}>
      <FormControl
        variant="outlined"
        style={{ marginBottom: "10px" }}
        sx={{ display: "flex", flexDirection: "row", gap: "10px" }}
      >
        <InputLabel id="filter-label">Filter</InputLabel>
        <Select
          labelId="filter-label"
          id="filter-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value as SearchFilter)}
          label="Filter"
        >
          <MenuItem value={SearchFilter.GENERIC_NAME}>Generic name</MenuItem>
          <MenuItem value={SearchFilter.BRAND_NAME}>Brand name</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <TextField
          label="Search for drugs"
          variant="outlined"
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          style={{ marginTop: "10px" }}
        >
          Search
        </Button>
      </FormControl>
    </form>
  );
};
