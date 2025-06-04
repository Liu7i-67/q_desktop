import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { Provider, useStore } from "./store/RootStore";
import { Drawer } from "@/components/TXDrawer";
import {
  IOrderDispatchMessageDrawerProps,
  IOrderDispatchMessageDrawerRef,
} from "./interface";
import { forwardRef, useImperativeHandle } from "react";
import { MessageBox } from "./modules/MessageBox";
import { Spin } from "antd";
import { useScroll } from "@/hooks/useScroll";

const OrderDispatchMessageDrawer = observer(
  forwardRef<IOrderDispatchMessageDrawerRef, IOrderDispatchMessageDrawerProps>(
    function OrderDispatchMessageDrawer_(props, ref) {
      const root = useStore();
      useSyncProps(root, Object.keys(props), props);
      const { logic, computed } = root;
      const sc = useScroll({
        onScrollToBottom: logic.nextPage,
      });

      useImperativeHandle(ref, () => {
        return {
          openDrawer: logic.openModal,
          closeDrawer: logic.closeModal,
        };
      });

      return (
        <Drawer
          open={logic.open}
          title="平台留言"
          width={500}
          destroyOnClose
          onClose={logic.closeModal}
        >
          <Spin spinning={computed.loading}>
            <div
              className="max-h-[calc(100vh-120px)] overflow-y-auto"
              ref={sc.ref}
              onScroll={sc.handleScroll}
            >
              <MessageBox />
            </div>
          </Spin>
        </Drawer>
      );
    }
  )
);

export default observer(
  forwardRef<IOrderDispatchMessageDrawerRef, IOrderDispatchMessageDrawerProps>(
    function OrderDispatchMessageDrawerPage(props, ref) {
      return (
        <Provider>
          <OrderDispatchMessageDrawer {...props} ref={ref} />
        </Provider>
      );
    }
  )
);
