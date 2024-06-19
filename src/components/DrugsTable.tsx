import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import { Drug } from "../utils/ts/interfaces";
import { useNavigate } from "react-router-dom";

interface DrugsTableProps {
  drugs: Drug[];
  page: number;
  rowsPerPage: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DrugsTable: React.FC<DrugsTableProps> = ({
  drugs,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const navigate = useNavigate();

  const handleDoubleClick = (productNdc: string) => {
    navigate(`/drug/${productNdc}`);
  };

  return (
    <>
      {drugs.length > 0 && (
        <>
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
                {drugs
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((drug, index) => (
                    <TableRow
                      key={index}
                      onDoubleClick={() =>
                        handleDoubleClick(drug.product_ndc || "")
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <TableCell>{drug.product_ndc || "N/A"}</TableCell>
                      <TableCell>{drug.generic_name || "N/A"}</TableCell>
                      <TableCell>{drug.brand_name || "N/A"}</TableCell>
                      <TableCell>{drug.dosage_form || "N/A"}</TableCell>
                    </TableRow>
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
        </>
      )}
    </>
  );
};
