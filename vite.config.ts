import { sveltekit } from "@sveltejs/kit/vite";
import { kitRoutes } from "vite-plugin-kit-routes";
import { defineConfig } from "vite";
import ws from "vite-sveltekit-node-ws";

import type { KIT_ROUTES } from "$lib/ROUTES";

export default defineConfig({
  plugins: [
    sveltekit(),
    ws(),
    kitRoutes<KIT_ROUTES>({
      LINKS: {
        facebook: "https://facebook.com/byteminds",
        youtube: "https://www.youtube.com/@bytemindstech",
        linkedin: "https://www.linkedin.com",
        tiktok: "https://tiktok.com",
        instagram: "https://www.instagram.com",
        classroom: "https://classroom.jhenbert.com",
        githubAvatar: "https://avatars.githubusercontent.com/u/[avatarId]?v=4",
      },
    }),
  ],
});
