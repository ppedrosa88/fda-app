import { useEffect, useState, useMemo, ChangeEvent } from "react";

import { Container, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

import { Drug } from "../utils/ts/interfaces";
import { fetchAllResults } from "../utils/API/openFdaApi";

import { DrugsTable, SearchBar, Loading, Messages } from "../components";

import logo from "../../public/FDA-Logo.webp";

export const Home = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const urlSearchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  ); // Memoizing URL search parameters for optimization

  // Retrieving query parameters from URL or setting defaults
  const queryParam = urlSearchParams.get("query") || "";
  const filterParam = urlSearchParams.get("filter") || "";
  const pageParam = urlSearchParams.get("page") || "0";
  const rowsPerPageParam = urlSearchParams.get("rowsPerPage") || "5";

  const [query, setQuery] = useState(queryParam);
  const [filter, setFilter] = useState(filterParam);
  const [drugs, setDrugs] = useState<Drug[]>([]);
  const [page, setPage] = useState(parseInt(pageParam, 10));
  const [rowsPerPage, setRowsPerPage] = useState(
    parseInt(rowsPerPageParam, 10)
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Effect hook to fetch drugs based on query and filter when they change
  useEffect(() => {
    const fetchDrugs = async () => {
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
    fetchDrugs();
  }, [query, filter]);

  // Effect hook to update URL with query parameters when they change
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("query", query);
    params.set("filter", filter);
    params.set("page", String(page));
    params.set("rowsPerPage", String(rowsPerPage));
    navigate({ search: params.toString() });
  }, [query, navigate, filter, page, rowsPerPage]);

  // Event handler to update query and filter when search input changes
  const handleSearch = (newQuery: string, newFilter: string) => {
    setQuery(newQuery);
    setFilter(newFilter);
    setPage(0);
  };

  // Event handler to update page when page number changes
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Event handler to update rows per page when rows per page changes
  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
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
        paddingRight: 4,
        paddingLeft: 4,
        paddingBottom: 4,
        backgroundColor: "#D0E5F0",
        marginBottom: 10,
      }}
    >
      <Box
        sx={{
          width: "100vw",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          mb: 4,
          backgroundColor: "#fff",
        }}
      >
        <Box
          component="img"
          sx={{
            height: "100%",
            width: 150,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
          }}
          alt="Fda-logo"
          src={logo}
        />
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
        {!isLoading && drugs.length === 0 && !error && (
          <Messages message="No drugs found." type="none" />
        )}
        {error && <Messages message={error} type="error" />}
      </Box>
    </Container>
  );
};
