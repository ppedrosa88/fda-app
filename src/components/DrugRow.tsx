import { TableCell, TableRow } from "@mui/material";
import { memo } from "react";
import { DrugRowProps } from "../utils/ts/interfaces";

/**
 * DrugRow Component
 * @param drug Drug object containing details like product NDC, generic name, brand name, and dosage form
 * @param onDoubleClick Function to handle double-click event on the drug row
 */
export const DrugRow = memo(
  ({ drug, onDoubleClick }: DrugRowProps): JSX.Element => (
    <TableRow
      onDoubleClick={() => onDoubleClick(drug.product_ndc || "")}
      sx={{
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#f5f5f5",
        },
      }}
    >
      <TableCell>{drug.product_ndc || "N/A"}</TableCell>
      <TableCell>{drug.generic_name || "N/A"}</TableCell>
      <TableCell>{drug.brand_name || "N/A"}</TableCell>
      <TableCell>{drug.dosage_form || "N/A"}</TableCell>
    </TableRow>
  )
);
