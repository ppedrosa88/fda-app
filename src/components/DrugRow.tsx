import { TableCell, TableRow } from "@mui/material";
import { memo } from "react";
import { DrugRowProps } from "../utils/ts/interfaces";

export const DrugRow = memo(({ drug, onDoubleClick }: DrugRowProps) => (
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
));
