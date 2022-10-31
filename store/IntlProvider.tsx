import { CacheProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { I18nProvider } from "../i18n";
import Home from "../pages";
import {
  createEmotionCache,
  createEmotionCacheLtr,
} from "../utils/createEmotionCache";
import { darkTheme, lightTheme } from "../utils/theme";

const clientSideEmotionCacheRtl = createEmotionCache();
const clientSideEmotionCacheLtr = createEmotionCacheLtr();

// let locale = "fa-ir";
// let theme = "dark";

const myTheme: any = { dark: darkTheme, light: lightTheme };

interface Props {
  locale: string;
  theme: string;
}

const IntlProvider = (props: Props) => {
  const { locale, theme } = props;
  return (
    <CacheProvider
      value={
        locale === "fa-ir"
          ? clientSideEmotionCacheRtl
          : clientSideEmotionCacheLtr
      }
    >
      <ThemeProvider theme={myTheme[theme]}>
        <CssBaseline />
        <I18nProvider locale={locale}>
          <Home />
        </I18nProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default IntlProvider;
