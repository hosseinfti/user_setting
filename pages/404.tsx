import { Box, Typography } from "@mui/material";

export default function Custom404() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h2">404 - Page Not Found</Typography>;
    </Box>
  );
}
