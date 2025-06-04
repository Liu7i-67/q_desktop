import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { Provider, useStore } from "./store/RootStore";
import { Modal } from "@/components/TXModal";
import { IMergeCustomerModalProps, IMergeCustomerModalRef } from "./interface";
import { forwardRef, useImperativeHandle } from "react";
import { Spin } from "antd";
import type { TableProps } from "antd";
import { TableList } from "./modules/TableList";
import { SearchHeader } from "./modules/SearchHeader";

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

const MergeCustomerModal = observer(
  forwardRef<IMergeCustomerModalRef, IMergeCustomerModalProps>(
    function MergeCustomerModal_(props, ref) {
      const root = useStore();
      useSyncProps(root, Object.keys(props), props);
      const { logic, computed } = root;

      useImperativeHandle(ref, () => {
        return {
          openModal: logic.openModal,
          closeModal: logic.closeModal,
        };
      });

      return (
        <Modal
          title="合并客户"
          open={logic.open}
          width={900}
          destroyOnClose
          onCancel={logic.closeModal}
          onOk={logic.handleConfirmMergeCustomer}
          okButtonProps={{
            loading: computed.confirmMergeCustomerLoading,
          }}
        >
          <Spin spinning={computed.confirmMergeCustomerLoading}>
            <SearchHeader />
            <TableList />
          </Spin>
        </Modal>
      );
    }
  )
);

export default observer(
  forwardRef<IMergeCustomerModalRef, IMergeCustomerModalProps>(
    function MergeCustomerModalPage(props, ref) {
      return (
        <Provider>
          <MergeCustomerModal {...props} ref={ref} />
        </Provider>
      );
    }
  )
);
