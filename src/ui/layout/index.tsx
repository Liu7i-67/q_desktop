import { Layout as AntdLayout } from "antd";
import { Outlet } from "react-router";
import { cn } from "@/utils/tools";
import WebHeader from "@/layout/header";
import MyMenu from "@/layout/my-menu";
import { useState } from "react";
import { observer, useWhen } from "@quarkunlimit/qu-mobx";
import { Provider, useStore } from "./store/RootStore";
import { Redirect } from "./modules/Redirect";

const Layout = observer(function Layout_() {
  const { Sider, Content, Header } = AntdLayout;
  const global = useStore();

  const [collapsed, setCollapsed] = useState(false);
  const changeSiderCollapsed = () => {
    setCollapsed(!collapsed);
  };

  useWhen(
    () => true,
    () => {
      global.logic.init();
    }
  );

  return (
    <AntdLayout className={cn("h-[100vh]")}>
      <Header className={cn("!bg-white shadow-md h-[36px]")}>
        <WebHeader />
      </Header>
      <AntdLayout>
        <Sider theme={"light"} collapsed={collapsed} width={240}>
          <MyMenu
            collapsed={collapsed}
            changeSiderCollapsed={changeSiderCollapsed}
          />
        </Sider>
        <Content className={cn("m-4", "")}>
          <div
            className={cn(
              "w-full p-4 h-full overflow-y-auto",
              "bg-white shadow-md rounded-md"
            )}
          >
            <Outlet />
          </div>
        </Content>
      </AntdLayout>
      <Redirect />
    </AntdLayout>
  );
});

export default observer(function CustomerDrawerPage() {
  return (
    <Provider>
      <Layout />
    </Provider>
  );
});
