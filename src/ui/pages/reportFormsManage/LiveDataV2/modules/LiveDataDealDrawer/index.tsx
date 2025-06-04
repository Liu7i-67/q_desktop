import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { Provider, useStore } from "./store/RootStore";
import { Drawer } from "@/components/TXDrawer";
import { ILiveDataDealDrawerProps, ILiveDataDealDrawerRef } from "./interface";
import { forwardRef, useImperativeHandle } from "react";
import { Button } from "antd";
import { TableList } from "./modules/TableList";

const LiveDataDealDrawer = observer(
  forwardRef<ILiveDataDealDrawerRef, ILiveDataDealDrawerProps>(
    function LiveDataDealDrawer_(props, ref) {
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
          title="成交明细数据"
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
  forwardRef<ILiveDataDealDrawerRef, ILiveDataDealDrawerProps>(
    function LiveDataDealDrawerPage(props, ref) {
      return (
        <Provider>
          <LiveDataDealDrawer {...props} ref={ref} />
        </Provider>
      );
    }
  )
);
