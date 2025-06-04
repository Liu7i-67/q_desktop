import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { Provider, useStore } from "./store/RootStore";
import { Drawer } from "@/components/TXDrawer";
import {
  ILiveDataDetailDrawerProps,
  ILiveDataDetailDrawerRef,
} from "./interface";
import { forwardRef, useImperativeHandle } from "react";
import { TableList } from "./modules/TableList";
import { Button } from "antd";
import LiveDataDetailSecondDrawer from "@/pages/reportFormsManage/LiveDataV2/modules/LiveDataDetailSecondDrawer";
import LiveDataDealDrawer from "@/pages/reportFormsManage/LiveDataV2/modules/LiveDataDealDrawer";

const LiveDataDetailDrawer = observer(
  forwardRef<ILiveDataDetailDrawerRef, ILiveDataDetailDrawerProps>(
    function LiveDataDetailDrawer_(props, ref) {
      const root = useStore();
      useSyncProps(root, Object.keys(props), props);
      const { logic, refs } = root;

      useImperativeHandle(ref, () => {
        return {
          openDrawer: logic.openDrawer,
          closeDrawer: logic.closeDrawer,
        };
      });

      return (
        <>
          <Drawer
            open={logic.open}
            width={1200}
            destroyOnClose
            title="主播数据详情"
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
          <LiveDataDetailSecondDrawer ref={refs.secondDrawerRef} />
          <LiveDataDealDrawer ref={refs.dealDrawerRef} />
        </>
      );
    }
  )
);

export default observer(
  forwardRef<ILiveDataDetailDrawerRef, ILiveDataDetailDrawerProps>(
    function LiveDataDetailDrawerPage(props, ref) {
      return (
        <Provider>
          <LiveDataDetailDrawer {...props} ref={ref} />
        </Provider>
      );
    }
  )
);
