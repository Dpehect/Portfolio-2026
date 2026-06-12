<script setup>
import Banner from "../../../components/Banner.vue";
import { preloaderVisible } from "../../../composables/usePreloader";
import { siteContent } from "../../../content/site";
import { t } from "../../../i18n/utils/translate";
</script>

<template>
  <div class="hero">
    <div class="hero-content grid">
      <div class="hero-content-inner" id="hero-content-inner">
        <div class="hero-content-copys">
          <h1 class="hero-title">
            <template v-for="(line, index) in siteContent.profile.heroNameLines" :key="line">
              <span class="hero-title-line">{{ line }}</span>
              <br v-if="index < siteContent.profile.heroNameLines.length - 1" />
            </template>
          </h1>
          <Banner class="hero-banner" :copy="t('job-title')" v-if="!preloaderVisible" animated />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hero {
  max-height: calc(var(--lvh) * 100);
  height: calc(var(--lvh) * 100);
  width: 100%;
  display: flex;
  position: relative;
  overflow: hidden;

  &-content {
    align-items: center;
    justify-content: center;
    height: 46%;

    @include mixins.landscape {
      height: 100%;

      @include mixins.mq("md") {
        padding-bottom: 30%;
      }

      @include mixins.mq("lg") {
        padding-bottom: 5%;
      }
    }

    &-inner {
      transform-origin: center center;
      grid-column: 1 / 13;
      gap: var(--space-xxl);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: fit-content;
      position: relative;
      left: 50%;
      transform: translateX(-50%);

      @include mixins.landscape {
        left: 0;
        transform: translateX(0);
        grid-column: 2 / 13;
        width: fit-content;
      }
    }

    &-copys {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);

      @include mixins.mq("md") {
        gap: var(--space-md);
      }
    }

    &-button {
      width: fit-content;
    }
  }

  &-title {
    color: var(--color-orange-400);
    font-family: "Cooper Black", "Arial Black", Impact, "Urbanist", sans-serif;
    font-weight: 900;
    letter-spacing: 0.025em;
    font-size: var(--font-size-title-xs);
    line-height: 0.92;
    paint-order: stroke fill;
    text-shadow:
      0.035em 0.045em 0 var(--color-white-400),
      0.075em 0.085em 0 rgba(45, 42, 36, 0.22);
    text-transform: uppercase;
    -webkit-text-stroke: clamp(1px, 0.022em, 2px) var(--color-text-400);

    &-line {
      display: inline-block;
      transform: rotate(-1.5deg);

      &:nth-of-type(2) {
        transform: translateX(0.08em) rotate(1.25deg);
      }
    }

    @include mixins.mq("sm") {
      font-size: var(--font-size-title-sm);
    }

    @include mixins.landscape {
      font-size: var(--font-size-title-sm);
    }

    @include mixins.landscape-large {
      @include mixins.mq("sm") {
        font-size: var(--font-size-title-md);
      }

      @include mixins.mq("xl") {
        font-size: var(--font-size-title-lg);
      }
    }
  }

  &-banner {
    position: absolute;
    bottom: 0;
    right: -16px;
    z-index: 10;
    transform: rotate(-5deg) translate(0, 65%);

    @include mixins.mq("sm") {
      right: -24px;
      transform: rotate(-5deg) translate(0, 70%);
    }

    @include mixins.mq("lg") {
      right: -32px;
      transform: rotate(-5deg) translate(0, 80%);
    }
  }
}
</style>
