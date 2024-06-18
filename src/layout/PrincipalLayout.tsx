import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";

export const PrincipalLayout = () => {
  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Outlet />
    </Grid>
  );
};
