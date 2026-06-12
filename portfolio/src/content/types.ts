import { projectIds } from "./projects/index";

import type { ProjectComponent } from "../features/projects/types";

export type ProjectId = (typeof projectIds)[number];

export interface ProjectContent {
  title: string;
  theme: "light" | "dark";
  tags: string[];
  description?: string;
  videoBorder?: boolean;
  live?: string;
  source?: string;
  components?: ProjectComponent[];
}

export interface SkillContent {
  name: string;
  bullets: string[];
}

export interface ProjectPreview {
  title: string;
  slug: string;
  thumbnail: string;
  description: string;
}
