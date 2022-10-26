import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import translate from "../i18n/translate";

export default function Custom404() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h2">404 - Page Not Found</Typography>
      <Link href="/">
        <Button variant="contained" sx={{ marginTop: "2em", padding: "1em" }}>
          <Typography variant="h4">{translate("return")}</Typography>
        </Button>
      </Link>
    </Box>
  );
}
