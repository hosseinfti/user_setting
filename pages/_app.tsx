import "../styles/globals.css";
import { ThemeProvider } from "@mui/material";
import { darkTheme } from "../utils/theme";
import createEmotionCache from "../utils/createEmotionCache";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { I18nProvider, LOCALES } from "../i18n";
import React, { useEffect, useState, createContext } from "react";

const clientSideEmotionCache = createEmotionCache();
interface AppContextInterface {
  locale: string;
  setLocale: (e: string) => void;
}
export const userContext = createContext<AppContextInterface | null>(null);

function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}) {
  const [locale, setLocale] = useState<string>(LOCALES.PERSIAN);

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

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <I18nProvider locale={locale}>
          <userContext.Provider
            value={{
              locale,
              setLocale: (e) => {
                handleLocale(e);
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
