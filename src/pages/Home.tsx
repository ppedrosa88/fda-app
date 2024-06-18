import { Grid, Typography } from "@mui/material";
import { SearchBar } from "../components/SearchBar";
import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { searchDrugs } from "../utils/API/openFdaApi";
import { Drug } from "../utils/ts/interfaces";
import { DrugsTable } from "../components/DrugsTable";

export const Home = () => {
  const [query, setQuery] = useState("");
  const [drugs, setDrugs] = useState<Drug[]>([]);
  //   const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null);

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    const handleSearch = async () => {
      if (debouncedQuery) {
        const results = await searchDrugs(debouncedQuery);
        setDrugs(results);
      }
    };

    handleSearch();
  }, [debouncedQuery]);

  const handleSearch = (query: string) => {
    setQuery(query);
  };

  //   const handleSelectDrug = (drug: Drug) => {
  //     setSelectedDrug(drug);
  //   };

  return (
    <Grid
      container
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          //   alignItems: "center",
          position: "sticky",
          height: "100px",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          OpenFDA Drug Search
        </Typography>
        <SearchBar onSearch={handleSearch} />
        {/* <pre>{JSON.stringify(drugs, null, 2)}</pre> */}
      </Grid>
      <Grid item xs={12}>
        <DrugsTable drugs={drugs} />
      </Grid>
    </Grid>
  );
};
