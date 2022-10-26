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
interface AppContextInterface {
  locale: string;
  setLocale: (e: string) => void;
  theme: any;
  setTheme: (e: string) => void;
}
export const userContext = createContext<AppContextInterface | null>(null);

function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}) {
  const [locale, setLocale] = useState<string>(LOCALES.PERSIAN);
  const [theme, setTheme] = useState<string>("light");

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
