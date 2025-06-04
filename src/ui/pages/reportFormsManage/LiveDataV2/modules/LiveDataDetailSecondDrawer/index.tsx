import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { Provider, useStore } from "./store/RootStore";
import { Drawer } from "@/components/TXDrawer";
import {
  ILiveDataDetailSecondDrawerProps,
  ILiveDataDetailSecondDrawerRef,
} from "./interface";
import { forwardRef, useImperativeHandle } from "react";
import { TableList } from "./modules/TableList";
import { Button } from "antd";

const LiveDataDetailSecondDrawer = observer(
  forwardRef<ILiveDataDetailSecondDrawerRef, ILiveDataDetailSecondDrawerProps>(
    function LiveDataDetailSecondDrawer_(props, ref) {
      const root = useStore();
      useSyncProps(root, Object.keys(props), props);
      const { logic } = root;

      useImperativeHandle(ref, () => {
        return {
          openDrawer: logic.openDrawer,
          closeDrawer: logic.closeDrawer,
        };
      });

      return (
        <Drawer
          title="客户明细数据"
          open={logic.open}
          width={1200}
          destroyOnClose
          onClose={logic.closeDrawer}
          extra={<Button onClick={logic.getList}>刷新</Button>}
          styles={{
            body: {
              padding: 8,
            },
          }}
        >
          <TableList />
        </Drawer>
      );
    }
  )
);

export default observer(
  forwardRef<ILiveDataDetailSecondDrawerRef, ILiveDataDetailSecondDrawerProps>(
    function LiveDataDetailSecondDrawerPage(props, ref) {
      return (
        <Provider>
          <LiveDataDetailSecondDrawer {...props} ref={ref} />
        </Provider>
      );
    }
  )
);
