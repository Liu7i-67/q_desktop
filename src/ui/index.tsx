import ReactDOM from "react-dom/client";
import "./index.css";
import "dayjs/locale/zh-cn";
import dayjs from "dayjs";
import zhCN from "antd/es/locale/zh_CN";
import { ConfigProvider } from "antd";
import Router from "@/router";
import { initSpeaker } from "./utils/speaker";

dayjs.locale("zh-cn");

document.body.addEventListener("click", initSpeaker);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ConfigProvider
    locale={zhCN}
    theme={{
      components: {
        Segmented: {
          itemSelectedBg: "#0867e9",
          itemSelectedColor: "#fff",
          itemColor: "#999999",
          itemHoverColor: "#999999",
        },
      },
    }}
  >
    <Router />
  </ConfigProvider>
);
