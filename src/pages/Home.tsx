import { Container, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchAllResults } from "../utils/API/openFdaApi";
import { Drug } from "../utils/ts/interfaces";
import { DrugsTable } from "../components/DrugsTable";
import { SearchBar } from "../components/SearchBar";
import { Loading } from "../components/Loading";

export const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search).get("query") || "";
  const filterParam = new URLSearchParams(location.search).get("filter") || "";
  const [query, setQuery] = useState(queryParam);
  const [filter, setFilter] = useState(filterParam);
  const [drugs, setDrugs] = useState<Drug[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleSearch = async () => {
      if (!query) {
        setDrugs([]);
        setError(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        if (query !== "") {
          const results = await fetchAllResults(query, filter);
          setDrugs(results);
        }
      } catch (err) {
        if (err instanceof Error && err.message) {
          setError(err.message);
        } else {
          setError("Error fetching drugs. Please try again later.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    handleSearch();
  }, [query, filter]);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("query", query);
    params.set("filter", filter);
    navigate({ search: params.toString() });
  }, [query, navigate, filter]);

  const handleSearch = (newQuery: string, newFilter: string) => {
    setQuery(newQuery);
    setFilter(newFilter);
    setPage(0);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 4,
        backgroundColor: "#f5f5f5",
        marginBottom: "10",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 4,
        }}
      >
        <SearchBar onSearch={handleSearch} initialQuery={query} />
      </Box>
      <Box
        sx={{
          width: "100%",
          flexGrow: 1,
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: 3,
          p: 2,
        }}
      >
        {isLoading && <Loading />}
        {!isLoading && drugs.length > 0 && !error && (
          <DrugsTable
            drugs={drugs}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
        {!isLoading && drugs.length === 0 && (
          <Typography color="textSecondary" align="center">
            No drugs found.
          </Typography>
        )}
        {error && (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}
      </Box>
    </Container>
  );
};
