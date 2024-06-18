import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Drug } from "../utils/ts/interfaces";
import { useNavigate } from "react-router-dom";

export const DrugsTable = ({ drugs }: { drugs: Drug[] }): JSX.Element => {
  const navigate = useNavigate();
  function handleClick(ncd: string) {
    navigate(`/${ncd}`);
  }

  return (
    <>
      {
        drugs.length > 0 && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Product NDC</TableCell>
                  <TableCell align="right">Brand Name</TableCell>
                  <TableCell align="right">Generic Name</TableCell>
                  {/* <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                  <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {drugs.map((row) => (
                  <TableRow
                    key={row.product_ndc}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    onClick={() => handleClick(row.product_ndc)}
                  >
                    <TableCell component="th" scope="row">
                      {row.product_ndc}
                    </TableCell>
                    <TableCell align="right">{row.brand_name}</TableCell>
                    <TableCell align="right">{row.generic_name}</TableCell>
                    {/* <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )
        //   (
        //     <table>
        //       <thead>
        //         <tr>
        //           <th>Product NDC</th>
        //           <th>Brand Name</th>
        //           <th>Generic Name</th>
        //         </tr>
        //       </thead>
        //       <tbody>
        //         {drugs.map((drug) => (
        //           <tr key={drug.product_ndc}>
        //             <td>{drug.product_ndc}</td>
        //             <td>{drug.brand_name}</td>
        //             <td>{drug.generic_name}</td>
        //           </tr>
        //         ))}
        //       </tbody>
        //     </table>
        //   )
      }
    </>
  );
};
