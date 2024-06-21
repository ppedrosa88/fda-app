import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Box,
} from "@mui/material";
import { useCallback } from "react";
import { DrugsTableProps } from "../utils/ts/interfaces";
import { useNavigate } from "react-router-dom";
import { DrugRow } from "./DrugRow";

export const DrugsTable: React.FC<DrugsTableProps> = ({
  drugs,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const navigate = useNavigate();

  const handleDoubleClick = useCallback(
    (productNdc: string) => {
      navigate(`/drug/${productNdc}`);
    },
    [navigate]
  );

  const paginatedDrugs = drugs.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box
      sx={{
        width: "100%",
        overflowX: "auto",
      }}
    >
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Product NDC</TableCell>
              <TableCell>Generic Name</TableCell>
              <TableCell>Brand Name</TableCell>
              <TableCell>Dosage Form</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedDrugs.map((drug) => (
              <DrugRow
                key={drug.product_ndc || drug.generic_name}
                drug={drug}
                onDoubleClick={handleDoubleClick}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={drugs.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </Box>
  );
};
