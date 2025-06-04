import { DrawerProps, Drawer } from "antd";

export const TXDrawer = function TXDrawer_(props: DrawerProps) {
  return <Drawer maskClosable={false} {...props}></Drawer>;
};

export { TXDrawer as Drawer };
