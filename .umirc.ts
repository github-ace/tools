import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    // { path: "/", component: "index" },
    { path: "/", component: "lottery" },
    // { path: "/lottery", component: "lottery" },
  ],
  metas: [
    {
      name: "apple-mobile-web-app-capable",
      content: "yes",
    },
  ],
  icons: {
    autoInstall: {},
  },
  npmClient: "pnpm",
  base: "/tools/",
  publicPath: "/tools/",
});
