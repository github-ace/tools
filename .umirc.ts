import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/lottery", component: "lottery", title: "大乐透" },
    { path: "/welfareLottery", component: "welfareLottery", title: "双色球" },
  ],
  npmClient: 'pnpm',
  base: "/tools/"
});
