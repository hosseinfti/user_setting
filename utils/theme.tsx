import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    common: {
      black: "#000000",
      white: "#ffffff",
    },
    primary: {
      dark: "#b08202",
      contrastText: "#FAFAFA",
      main: "#fcba03",
    },
    secondary: {
      dark: "#cce6ff",
      main: "#DDEEFF",
      light: "#ecf6ff",
      contrastText: "#0383FF",
    },
    text: {
      secondary: "#79838e",
      primary: "#ffffff",
      disabled: "#8D959C",
    },
    background: {
      default: "#161a24",
      paper: "#202b34",
    },
    grey: {
      50: "#FAFAFA",
      100: "#333c47",
      200: "#212b35",
      300: "#3d4650",
    },
  },
  typography: {
    fontFamily: ["samim", "vazir", "tahoma", "Arial", "sans-serif"].join(","),
    fontSize: 14,
  },
});
export const lightTheme = createTheme({
  palette: {
    mode: "dark",
    common: {
      black: "#000000",
      white: "#ffffff",
    },
    primary: {
      dark: "#b08202",
      contrastText: "#FAFAFA",
      main: "#6b6b6b",
    },
    secondary: {
      dark: "#cce6ff",
      main: "#DDEEFF",
      light: "#ecf6ff",
      contrastText: "#0383FF",
    },
    text: {
      secondary: "#000000",
      primary: "#000000",
      disabled: "#8D959C",
    },
    background: {
      default: "#ffffff",
      paper: "#ababab",
    },
    grey: {
      50: "#FAFAFA",
      100: "#ffffff",
      200: "#ababab",
      300: "#3d4650",
    },
  },
  typography: {
    fontFamily: ["samim", "vazir", "tahoma", "Arial", "sans-serif"].join(","),
    fontSize: 14,
  },
});
