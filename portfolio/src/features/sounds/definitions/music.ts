import { Howl } from "howler";

import { resolveSiteAsset, siteContent } from "../../../content/site";

import type { MusicTrack } from "../types";

const tracks = siteContent.music.tracks;

export const musicTracks = {
  luci: new Howl({ src: [resolveSiteAsset(tracks.luci.src)], loop: true, volume: 0, preload: false }),
  about: new Howl({ src: [resolveSiteAsset(tracks.about.src)], loop: true, volume: 0, preload: false }),
} as const;

export const BASE_VOLUMES = {
  luci: tracks.luci.volume,
  about: tracks.about.volume,
} as const satisfies Record<MusicTrack, number>;
