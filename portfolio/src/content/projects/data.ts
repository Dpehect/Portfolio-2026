import { tagLabels, type TagVariant } from "../../components/tagVariants";
import { resolveSiteAsset, siteContent } from "../site";

import type { Locale } from "../../i18n/types";
import type { ProjectContent, ProjectPreview } from "../types";
import type { ProjectComponent } from "../../features/projects/types";

type ProjectJsonContent = Omit<ProjectContent, "components" | "tags" | "theme"> & {
  previewDescription: string;
  theme?: ProjectContent["theme"];
  tags?: string[];
  components?: ProjectComponent[];
};

type ProjectJsonEntry = {
  slug: string;
  thumbnail: string;
  content: {
    en: ProjectJsonContent;
  } & Partial<Record<Locale, ProjectJsonContent>>;
};

const locales = ["de", "en"] as const satisfies Locale[];
const projectEntries = siteContent.projects as ProjectJsonEntry[];

const resolveComponentAssets = (component: ProjectComponent): ProjectComponent => {
  if (component.type === "media") {
    return {
      ...component,
      props: {
        ...component.props,
        src: resolveSiteAsset(component.props.src),
      },
    };
  }

  if (component.type === "imageText") {
    return {
      ...component,
      props: {
        ...component.props,
        src: resolveSiteAsset(component.props.src),
        component: component.props.component
          ? resolveComponentAssets(component.props.component as ProjectComponent)
          : undefined,
      },
    };
  }

  return component;
};

const builtInTags = new Set(Object.keys(tagLabels) as TagVariant[]);

const normalizeTags = (tags: string[] = []) => {
  return tags.map((tag) => (builtInTags.has(tag as TagVariant) ? tag : tag.trim())).filter(Boolean);
};

const getLocalizedContent = (entry: ProjectJsonEntry, locale: Locale) => {
  return entry.content[locale] ?? entry.content.en;
};

const buildContent = (entry: ProjectJsonEntry, locale: Locale): ProjectContent => {
  const localized = getLocalizedContent(entry, locale);
  const { previewDescription: _previewDescription, components = [], tags = [], theme = "light", ...content } = localized;

  return {
    ...content,
    theme,
    tags: normalizeTags(tags),
    components: components.map(resolveComponentAssets),
  };
};

const buildPreview = (entry: ProjectJsonEntry, locale: Locale): ProjectPreview => {
  const localized = getLocalizedContent(entry, locale);

  return {
    title: localized.title,
    slug: entry.slug,
    thumbnail: resolveSiteAsset(entry.thumbnail),
    description: localized.previewDescription,
  };
};

export const projectIds = projectEntries.map((project) => project.slug);

export const projectPreviews = Object.fromEntries(
  locales.map((locale) => [locale, projectEntries.map((project) => buildPreview(project, locale))]),
) as Record<Locale, ProjectPreview[]>;

export const projectContents = Object.fromEntries(
  locales.map((locale) => [
    locale,
    Object.fromEntries(projectEntries.map((project) => [project.slug, buildContent(project, locale)])),
  ]),
) as Record<Locale, Record<string, ProjectContent>>;

export const getProjectPreviews = (locale: Locale) => projectPreviews[locale];

export const getProjectContent = (locale: Locale, slug: string) => projectContents[locale][slug];
