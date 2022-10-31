// import { CacheProvider, ThemeProvider } from "@emotion/react";
// import { CssBaseline } from "@mui/material";
import React from "react";
// type RootState = ReturnType<typeof store.getState>;
import { TypedUseSelectorHook, useSelector } from "react-redux";
// import { I18nProvider } from "../i18n";
// import { LocaleStateType, ThemeStateType } from "../store/store";
// import Ali from "./Ali";
import IntlProvider from "./IntlProvider";
import { storeType } from "./store";
// import {
//   createEmotionCache,
//   createEmotionCacheLtr,
// } from "../utils/createEmotionCache";
// import { darkTheme, lightTheme } from "../utils/theme";
// import Home from "./index";

// const clientSideEmotionCacheRtl = createEmotionCache();
// const clientSideEmotionCacheLtr = createEmotionCacheLtr();

// const myTheme: any = { dark: darkTheme, light: lightTheme };

export const useAppSelector: TypedUseSelectorHook<storeType> = useSelector;

// let locale = "fa-ir";
// let theme = "dark";

const locale = useAppSelector((state: storeType) => state.locale);
const theme = useAppSelector((state: storeType) => state.theme);

const MyProvider = () => {
  return (
    <div>
      <IntlProvider locale={locale} theme={theme} />
    </div>
    // <CacheProvider
    //   value={
    //     locale === "fa-ir"
    //       ? clientSideEmotionCacheRtl
    //       : clientSideEmotionCacheLtr
    //   }
    // >
    //   <ThemeProvider theme={myTheme[theme]}>
    //     <CssBaseline />
    //     <I18nProvider locale={locale}>
    //       <Home />
    //     </I18nProvider>
    //   </ThemeProvider>
    // </CacheProvider>
  );
};

export default MyProvider;
