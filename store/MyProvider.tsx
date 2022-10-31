import { CacheProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { I18nProvider } from "../i18n";
import Home from "../pages";
import {
  createEmotionCache,
  createEmotionCacheLtr,
} from "../utils/createEmotionCache";
import { darkTheme, lightTheme } from "../utils/theme";
import { storeType } from "./store";

const clientSideEmotionCacheRtl = createEmotionCache();
const clientSideEmotionCacheLtr = createEmotionCacheLtr();

export const useAppSelector: TypedUseSelectorHook<storeType> = useSelector;
const myTheme: any = { dark: darkTheme, light: lightTheme };

const MyProvider = () => {
  const locale = useAppSelector((state: storeType) => state.locale);
  const theme = useAppSelector((state: storeType) => state.theme);

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

export default MyProvider;
