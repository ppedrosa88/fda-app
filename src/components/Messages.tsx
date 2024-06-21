import { Typography } from "@mui/material";

export const Messages = ({
  message,
  type,
}: {
  message: string;
  type: "none" | "error";
}): JSX.Element => {
  return (
    <Typography
      sx={{ color: type === "none" ? "primary" : "red" }}
      align="center"
    >
      {message}
    </Typography>
  );
};
