import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";

export function createEmotionCache() {
  return createCache({
    key: "muirtl",
    prepend: true,
    stylisPlugins: [rtlPlugin, prefixer],
  });
}

export function createEmotionCacheLtr() {
  return createCache({
    key: "muiltr",
    prepend: true,
  });
}
