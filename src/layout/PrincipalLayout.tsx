import { Outlet } from "react-router-dom";
import { Grid } from "@mui/material";

export const PrincipalLayout = () => {
  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#D0E5F0",
      }}
    >
      <Outlet />
    </Grid>
  );
};
