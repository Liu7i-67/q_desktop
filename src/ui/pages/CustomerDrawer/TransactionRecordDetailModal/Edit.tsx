import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { Provider, useStore } from "./store/RootStore";
import { Modal } from "@/components/TXModal";
import {
  ITransactionRecordDetailModalProps,
  ITransactionRecordDetailModalRef,
} from "./interface";
import { forwardRef, useImperativeHandle } from "react";
import { BaseInfo } from "./modules/BaseInfo";
import { TransactionInfo } from "./modules/TransactionInfo";
import { TransactionList } from "./modules/TransactionList";
import { SideBar } from "./modules/SideBar";

const TransactionRecordDetailModal = observer(
  forwardRef<
    ITransactionRecordDetailModalRef,
    ITransactionRecordDetailModalProps
  >(function TransactionRecordDetailModal_(props, ref) {
    const root = useStore();
    useSyncProps(root, Object.keys(props), props);
    const { logic, computed } = root;

    useImperativeHandle(ref, () => {
      return {
        openModal: logic.openModal,
        closeModal: logic.closeModal,
      };
    });

    if (!logic.initData) {
      return null;
    }

    return (
      <Modal
        open={logic.open}
        width={1100}
        destroyOnClose
        title={"成交详情"}
        loading={computed.initLoading}
        onCancel={logic.closeModal}
        cancelText="关闭"
        okText="保存"
        className="pr-[300px]"
        onOk={logic.onOK}
        styles={{
          body: {
            maxHeight: "60vh",
            overflowY: "auto",
            padding: "16px 16px 16px 0",
            boxSizing: "border-box",
          },
        }}
      >
        <BaseInfo />
        <TransactionInfo />
        <TransactionList />
        <SideBar />
      </Modal>
    );
  })
);

export default observer(
  forwardRef<
    ITransactionRecordDetailModalRef,
    ITransactionRecordDetailModalProps
  >(function TransactionRecordDetailModalPage(props, ref) {
    return (
      <Provider>
        <TransactionRecordDetailModal {...props} ref={ref} />
      </Provider>
    );
  })
);
