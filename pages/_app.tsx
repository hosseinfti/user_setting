import "../styles/globals.css";
import { ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from "../utils/theme";
import {
  createEmotionCache,
  createEmotionCacheLtr,
} from "../utils/createEmotionCache";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { I18nProvider, LOCALES } from "../i18n";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, Provider } from "react-redux";
import store, {
  localeActions,
  LocaleStateType,
  ThemeStateType,
} from "../store/store";

const clientSideEmotionCacheRtl = createEmotionCache();
const clientSideEmotionCacheLtr = createEmotionCacheLtr();

const myTheme: any = { dark: darkTheme, light: lightTheme };

interface Props {
  Component: any;
  emotionCache: any;
  pageProps: any;
}

function MyApp(props: Props) {
  const { Component, emotionCache, pageProps } = props;

  const locale = useSelector((state: LocaleStateType) => state.locale);
  const theme = useSelector((state: ThemeStateType) => state.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    let currentLang = localStorage.getItem("lang");
    if (currentLang) {
      dispatch(localeActions.setLocale(currentLang));
    }
  }, []);

  return (
    <Provider store={store}>
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
            <Component {...pageProps} />
          </I18nProvider>
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  );
}

export default MyApp;
