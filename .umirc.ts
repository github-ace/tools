import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/lottery", component: "lottery" },
  ],
  npmClient: 'pnpm',
  base: "/tools/",
  publicPath: "/tools/"
});
