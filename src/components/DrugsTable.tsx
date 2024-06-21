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

import { DrugsTableProps } from "../utils/ts/interfaces";
import { useNavigate } from "react-router-dom";
import { DrugRow } from "./DrugRow";

/**
 * DrugsTable Component
 * @param drugs Array of drugs to display in the table
 * @param page Current page index for pagination
 * @param rowsPerPage Number of rows per page
 * @param onPageChange Function for page change event
 * @param onRowsPerPageChange Function for rows per page change event
 */
export const DrugsTable = ({
  drugs,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: DrugsTableProps): JSX.Element => {
  const navigate = useNavigate();

  // Function to handle double-click event on a drug row
  const handleDoubleClick = (productNdc: string) => {
    navigate(`/drug/${productNdc}`);
  };

  // Slice the drugs array to get only the drugs for the current page
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
