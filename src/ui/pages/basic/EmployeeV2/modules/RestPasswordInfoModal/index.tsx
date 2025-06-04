import { Modal } from "@/components/TXModal";
import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { forwardRef, useImperativeHandle } from "react";
import {
  IRestPasswordInfoModalProps,
  IRestPasswordInfoModalRef,
} from "./interface";
import RestPasswordInfo from "./modules/RestPasswordInfo";
import { Provider, useStore } from "./store/RootStore";

const RestPasswordInfoModal = observer(
  forwardRef<IRestPasswordInfoModalRef, IRestPasswordInfoModalProps>(
    function RestPasswordInfoModal_(props, ref) {
      const root = useStore();
      useSyncProps(root, Object.keys(props), props);
      const { logic } = root;

      useImperativeHandle(ref, () => {
        return {
          openModal: logic.openModal,
          closeModal: logic.closeModal,
        };
      });

      return (
        <Modal
          title="重置结果"
          open={logic.open}
          width={550}
          destroyOnClose
          onOk={logic.closeModal}
          onCancel={logic.closeModal}
        >
          <RestPasswordInfo />
        </Modal>
      );
    }
  )
);

export default observer(
  forwardRef<IRestPasswordInfoModalRef, IRestPasswordInfoModalProps>(
    function RestPasswordInfoModalPage(props, ref) {
      return (
        <Provider>
          <RestPasswordInfoModal {...props} ref={ref} />
        </Provider>
      );
    }
  )
);
