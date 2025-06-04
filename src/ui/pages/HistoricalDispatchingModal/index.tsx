import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { Provider, useStore } from "./store/RootStore";
import { Modal } from "@/components/TXModal";
import {
  IHistoricalDispatchingModalProps,
  IHistoricalDispatchingModalRef,
} from "./interface";
import { forwardRef, useImperativeHandle } from "react";
import { TableList } from "./modules/TableList";

const HistoricalDispatchingModal = observer(
  forwardRef<IHistoricalDispatchingModalRef, IHistoricalDispatchingModalProps>(
    function HistoricalDispatchingModal_(props, ref) {
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
          open={logic.open}
          title="历史派单"
          width={800}
          destroyOnClose
          onCancel={logic.closeModal}
          footer={false}
        >
          <TableList />
        </Modal>
      );
    }
  )
);

export default observer(
  forwardRef<IHistoricalDispatchingModalRef, IHistoricalDispatchingModalProps>(
    function HistoricalDispatchingModalPage(props, ref) {
      return (
        <Provider>
          <HistoricalDispatchingModal {...props} ref={ref} />
        </Provider>
      );
    }
  )
);
