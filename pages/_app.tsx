import "../styles/globals.css";
import { ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from "../utils/theme";
import createEmotionCache from "../utils/createEmotionCache";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { I18nProvider, LOCALES } from "../i18n";
import React, { useEffect, useState, createContext } from "react";

const clientSideEmotionCache = createEmotionCache();

const myTheme: any = { dark: darkTheme, light: lightTheme };
export interface AppContextInterface {
  locale: string;
  setLocale: (e: string) => void;
  theme: any;
  setTheme: (e: string) => void;
}
export const userContext = createContext<AppContextInterface | null>(null);

interface Props {
  Component: any;
  emotionCache: any;
  pageProps: any;
}

function MyApp(props: Props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [locale, setLocale] = useState<string>(LOCALES.PERSIAN);
  const [theme, setTheme] = useState<string>("dark");

  useEffect(() => {
    let currentLang = localStorage.getItem("lang");
    if (currentLang) {
      setLocale(currentLang);
    }
  }, []);

  useEffect(() => {
    locale && locale !== null && localStorage.setItem("lang", locale);
  }, [locale]);

  const handleLocale = (e: string) => {
    setLocale(e);
  };
  const handleTheme = (e: string) => {
    setTheme(e);
  };

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={myTheme[theme]}>
        <CssBaseline />
        <I18nProvider locale={locale}>
          <userContext.Provider
            value={{
              locale,
              setLocale: (e) => {
                handleLocale(e);
              },
              theme,
              setTheme: (e) => {
                handleTheme(e);
              },
            }}
          >
            <Component {...pageProps} />
          </userContext.Provider>
        </I18nProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
