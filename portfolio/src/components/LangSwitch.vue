<script setup lang="ts">
import Button from "./Button.vue";
import { locale } from "../i18n/store";
import { changeLocale } from "../i18n/utils/locale";

import type { Locale } from "../i18n/types";

const languageOptions = [
  { code: "en", label: "EN" },
  { code: "de", label: "DE" },
  { code: "tr", label: "TR" },
] as const satisfies { code: Locale; label: string }[];
</script>

<template>
  <div class="lang-switch" aria-label="Language">
    <Button
      v-for="option in languageOptions"
      :key="option.code"
      :variant="locale === option.code ? 'accent' : 'border'"
      size="sm"
      :aria-pressed="locale === option.code"
      @click="changeLocale(option.code)"
      data-cursor="circle-white"
      data-sound="click"
      data-hoversound="hover"
      >{{ option.label }}</Button
    >
  </div>
</template>

<style scoped lang="scss">
.lang-switch {
  display: flex;
  align-items: center;
  gap: var(--space-xxs);
}
</style>
