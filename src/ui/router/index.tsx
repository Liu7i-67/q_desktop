import TXSuspense from "@/components/TXSuspense";
import { Page404 } from "@/pages/Page404";
import Auth from "@/router/auth";
import { routerList } from "@/router/router-list";
import userHelper from "@/utils/user-helper";
import { lazy, useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router";
import { v4 as uuid } from "uuid";

const Layout = lazy(() => import("@/layout"));
const Login = lazy(() => import("@/pages/login"));

const user_helper = userHelper.getInstance();
user_helper.initLoginInfo();

const taoxi_icon = "https://resources.taoxiplan.com/logo.png";
const qingyan_icon = "https://resources.taoxiplan.com/qingyan_logo.png";

const render_header_icon = (icon_path: string) => {
  const link = document.querySelector("link[rel~='icon']");
  if (link) {
    // @ts-ignore
    link.href = icon_path;
  } else {
    const newLink = document.createElement("link");
    newLink.rel = "icon";
    newLink.href = icon_path;
    document.head.appendChild(newLink);
  }
};

const render_header = () => {
  const tenantId = userHelper.getInstance().getTenantId;
  const host = window.location.host;
  const suffix = host.includes("test") ? "（测试）" : "";
  if (!suffix && host.includes("taoxi")) {
    document.title = `讨喜OA${suffix}`;
    render_header_icon(taoxi_icon);
    return;
  }
  if (!suffix && host.includes("qingyan")) {
    document.title = `清颜OA${suffix}`;
    render_header_icon(qingyan_icon);
    return;
  }

  switch (tenantId) {
    case "1":
      document.title = `讨喜OA${suffix}`;
      render_header_icon(taoxi_icon);
      break;
    case "2":
      document.title = `清颜OA${suffix}`;
      render_header_icon(qingyan_icon);
      break;
    default:
      document.title = `讨喜OA${suffix}`;
      render_header_icon(taoxi_icon);
      break;
  }
};
const Router = () => {
  useEffect(() => {
    render_header();
  }, []);

  function mapRouter(route: any[]): any {
    return route.map((item: any) => {
      if (item.children) {
        return mapRouter(item.children);
      }
      return (
        <Route
          key={uuid()}
          path={item.key}
          element={
            <Auth auth={item.auth}>
              <item.element />
            </Auth>
          }
        />
      );
    });
  }

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {mapRouter(routerList)}
        </Route>
        <Route
          path="/login"
          element={
            <TXSuspense>
              <Login />
            </TXSuspense>
          }
        />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </HashRouter>
  );
};
export default Router;
