export const LOCALES = {
  en: {
    iso: "en-US",
    name: "English",
  },
  de: {
    iso: "de-DE",
    name: "Deutsch",
  },
  tr: {
    iso: "tr-TR",
    name: "Türkçe",
  },
} as const satisfies Record<
  string,
  {
    name: string;
    iso: string;
  }
>;

export const LOCALE_DEFAULT: keyof typeof LOCALES = "en";
