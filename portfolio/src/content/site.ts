import siteJson from "./site.json";

import type { Locale } from "../i18n/types";

type Localized<T> = Record<Locale, T>;
type SiteCommonTranslations = Record<string, string>;

export type SocialName = "mail" | "github" | "linkedin" | "medium";

export type SocialItem = {
  name: SocialName;
  url: string;
};

export type HomeContent = {
  detailsName: string;
  languages: string[];
  services: string[];
};

export type MusicTrackConfig = {
  src: string;
  volume: number;
};

export type SiteContent = typeof siteJson & {
  social: SocialItem[];
  home: Localized<HomeContent>;
  translations: Localized<{
    common: SiteCommonTranslations;
  }>;
  music: {
    tracks: {
      luci: MusicTrackConfig;
      about: MusicTrackConfig;
    };
  };
};

export const siteContent = siteJson as SiteContent;

const assetModules = import.meta.glob<string>("../assets/**/*.{webp,png,jpg,jpeg,gif,svg,mp3,ogg,wav,m4a,mp4,webm}", {
  eager: true,
  import: "default",
  query: "?url",
});

const normalizeAssetPath = (source: string) => {
  return source.replace(/\\/g, "/").replace(/^\.?\//, "").replace(/^(src\/)?assets\//, "");
};

export const resolveSiteAsset = (source: string) => {
  if (/^(https?:|data:|\/)/.test(source)) return source;

  const normalized = normalizeAssetPath(source);
  const asset = assetModules[`../assets/${normalized}`];

  if (!asset) {
    console.warn(`[site] Asset not found: ${source}`);
    return source;
  }

  return asset;
};

export const getHomeContent = (locale: Locale | null) => {
  return siteContent.home[locale ?? "en"] ?? siteContent.home.en;
};

export const getSiteTranslations = (locale: Locale, namespace: string) => {
  const localeTranslations = siteContent.translations[locale] as Record<string, SiteCommonTranslations> | undefined;
  return localeTranslations?.[namespace] ?? {};
};
