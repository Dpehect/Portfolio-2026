import { watch } from "vue";
import { loadTranslations } from "../utils/load";
import { locale, translations } from "../store";
import { onMounted } from "vue";

import type { Locale } from "../types";

export const useTranslations = () => {
  onMounted(() => {
    locale.value = window.localStorage.getItem("portfolio-locale") as Locale;
    if (!locale.value) {
      locale.value = "en";
    }
  });

  watch(locale, () => {
    if (!locale.value) return;
    window.localStorage.setItem("portfolio-locale", locale.value);
  });

  watch(
    locale,
    async (newLocale) => {
      if (!newLocale) return;
      translations.value = (await loadTranslations("common", newLocale)) ?? {};
    },
    { immediate: true },
  );
};
