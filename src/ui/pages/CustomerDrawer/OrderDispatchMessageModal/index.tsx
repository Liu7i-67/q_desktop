import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { Provider, useStore } from "./store/RootStore";
import { Modal } from "@/components/TXModal";
import {
  IOrderDispatchMessageModalProps,
  IOrderDispatchMessageModalRef,
} from "./interface";
import { forwardRef, useImperativeHandle } from "react";
import { MessageBox } from "./modules/MessageBox";
import { Spin } from "antd";
import { useScroll } from "@/hooks/useScroll";
import { FormContent } from "./modules/FormContent";

const OrderDispatchMessageModal = observer(
  forwardRef<IOrderDispatchMessageModalRef, IOrderDispatchMessageModalProps>(
    function OrderDispatchMessageModal_(props, ref) {
      const root = useStore();
      useSyncProps(root, Object.keys(props), props);
      const { logic, computed } = root;
      const sc = useScroll({
        onScrollToBottom: logic.nextPage,
      });

      useImperativeHandle(ref, () => {
        return {
          openModal: logic.openModal,
          closeModal: logic.closeModal,
        };
      });

      return (
        <Modal
          open={logic.open}
          title="派单留言"
          okText="留言"
          width={500}
          destroyOnClose
          onOk={logic.submit}
          onCancel={logic.closeModal}
        >
          <Spin spinning={computed.loading}>
            <div
              className="max-h-[400px] overflow-y-auto"
              ref={sc.ref}
              onScroll={sc.handleScroll}
            >
              <MessageBox />
            </div>
            <FormContent />
          </Spin>
        </Modal>
      );
    }
  )
);

export default observer(
  forwardRef<IOrderDispatchMessageModalRef, IOrderDispatchMessageModalProps>(
    function OrderDispatchMessageModalPage(props, ref) {
      return (
        <Provider>
          <OrderDispatchMessageModal {...props} ref={ref} />
        </Provider>
      );
    }
  )
);
