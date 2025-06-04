import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { Provider, useStore } from "./store/RootStore";
import { Drawer } from "@/components/TXDrawer";
import {
  IInstitutionalFeedbackDrawerProps,
  IInstitutionalFeedbackDrawerRef,
} from "./interface";
import { forwardRef, useImperativeHandle } from "react";
import { Spin } from "antd";
import { useScroll } from "@/hooks/useScroll";
import { FeedbackBox } from "./modules/FeedbackBox";

const InstitutionalFeedbackDrawer = observer(
  forwardRef<
    IInstitutionalFeedbackDrawerRef,
    IInstitutionalFeedbackDrawerProps
  >(function InstitutionalFeedbackDrawer_(props, ref) {
    const root = useStore();
    useSyncProps(root, Object.keys(props), props);
    const { logic, computed } = root;

    const sc = useScroll({
      onScrollToBottom: logic.nextPage,
    });

    useImperativeHandle(ref, () => {
      return {
        openDrawer: logic.openDrawer,
        closeDrawer: logic.closeDrawer,
      };
    });

    return (
      <Drawer
        open={logic.open}
        width={600}
        title="机构处理明细"
        destroyOnClose
        onClose={logic.closeDrawer}
      >
        <Spin spinning={computed.loading}>
          <div
            className="max-h-[calc(100vh-120px)] overflow-y-auto"
            ref={sc.ref}
            onScroll={sc.handleScroll}
          >
            <FeedbackBox />
          </div>
        </Spin>
      </Drawer>
    );
  })
);

export default observer(
  forwardRef<
    IInstitutionalFeedbackDrawerRef,
    IInstitutionalFeedbackDrawerProps
  >(function InstitutionalFeedbackDrawerPage(props, ref) {
    return (
      <Provider>
        <InstitutionalFeedbackDrawer {...props} ref={ref} />
      </Provider>
    );
  })
);
