type RoutesConfig = {
  [propName: string]: { title: string; [propName: string]: string | number };
};

export const routesConfig: RoutesConfig = {
  "/": { title: "tools" },
  "/lottery": { title: "抽一把" },
};
