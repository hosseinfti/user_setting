import { CacheProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
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

const MyProvider = () => {
  const _Theme: any = { dark: darkTheme, light: lightTheme };
  const locale = useAppSelector((state: storeType) => state.locale);
  const theme = useAppSelector((state: storeType) => state.theme);

  return (
    <CacheProvider
      value={
        locale.locale === "fa-ir"
          ? clientSideEmotionCacheRtl
          : clientSideEmotionCacheLtr
      }
    >
      <ThemeProvider theme={_Theme[theme.theme]}>
        <CssBaseline />
        <I18nProvider locale={locale.locale}>
          <Home />
        </I18nProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyProvider;
