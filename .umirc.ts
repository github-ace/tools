import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/lottery", component: "lottery", title: "大乐透" },
  ],
  npmClient: 'pnpm',
});
