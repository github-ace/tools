import { Outlet, Helmet, useLocation } from "umi";
import styles from "./index.less";
import { Watermark } from "antd";
import { routesConfig } from "@/config/site";

export default function Layout() {
  const location = useLocation();
  return (
    <>
      <Helmet>
        <title>{routesConfig[location.pathname].title}</title>
      </Helmet>
      <Watermark content="github-ace">
        <div style={{ minHeight: "96vh" }}>
          <Outlet />
        </div>
      </Watermark>
    </>
  );
}
