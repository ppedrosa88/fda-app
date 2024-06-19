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
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Outlet />
    </Grid>
  );
};
