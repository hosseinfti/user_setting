import { configureStore, createSlice } from "@reduxjs/toolkit";

export type localStringsType = "fa-ir" | "en-us";
export type themeStringsType = "light" | "dark";

export interface storeType {
  locale: localStringsType;
  theme: themeStringsType;
}

export interface LocaleStateType {
  locale: localStringsType;
}
export interface ThemeStateType {
  theme: themeStringsType;
}

const initialLocaleState: LocaleStateType = {
  locale: "fa-ir",
};
const initialThemeState: ThemeStateType = {
  theme: "dark",
};

const localeSlice = createSlice({
  name: "locale",
  initialState: initialLocaleState,
  reducers: {
    setLocale(state, action) {
      state.locale = action.payload;
    },
  },
});
const themeSlice = createSlice({
  name: "theme",
  initialState: initialThemeState,
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
    },
  },
});

const store = configureStore({
  reducer: { locale: localeSlice.reducer, theme: themeSlice.reducer },
});


export const localeActions = localeSlice.actions;
export const themeActions = themeSlice.actions;
export default store;
