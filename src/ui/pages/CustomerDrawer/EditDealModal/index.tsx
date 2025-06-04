import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { Provider, useStore } from "./store/RootStore";
import { Modal } from "@/components/TXModal";
import { IEditDealModalProps, IEditDealModalRef } from "./interface";
import { forwardRef, useImperativeHandle } from "react";
import { Col, Form, Row } from "antd";
import { HistoryRow } from "./modules/HistoryRow";
import { CreateTimeRow } from "./modules/CreateTimeRow";
import { DealDateRow } from "./modules/DealDateRow";
import { ItemPostDTOList } from "./modules/ItemPostDTOList";
import { OrgRow } from "./modules/OrgRow";
import { AmountRow } from "./modules/AmountRow";
import { MemoRow } from "./modules/MemoRow";

const EditDealModal = observer(
  forwardRef<IEditDealModalRef, IEditDealModalProps>(
    function EditDealModal_(props, ref) {
      const root = useStore();
      useSyncProps(root, Object.keys(props), props);
      const { logic, refs, computed } = root;

      useImperativeHandle(ref, () => {
        return {
          openModal: logic.openModal,
          closeModal: logic.closeModal,
        };
      });

      return (
        <Modal
          title="成交录入"
          open={logic.open}
          width={680}
          destroyOnClose
          onCancel={logic.closeModal}
          onOk={logic.submit}
          styles={{
            body: {
              maxHeight: "60vh",
              overflowY: "auto",
              padding: "16px 16px 16px 0",
              boxSizing: "border-box",
            },
          }}
          confirmLoading={computed.loading}
        >
          <Form layout="vertical" form={refs.form}>
            <HistoryRow />
            <Row gutter={16}>
              <Col span={12}>
                <DealDateRow />
              </Col>
              <Col span={12}>
                <CreateTimeRow />
              </Col>
            </Row>
            <ItemPostDTOList />
            <Row gutter={16} className="-mt-6">
              <Col span={12}>
                <OrgRow />
              </Col>
              <Col span={12}>
                <AmountRow />
              </Col>
            </Row>
            <MemoRow />
          </Form>
        </Modal>
      );
    }
  )
);

export default observer(
  forwardRef<IEditDealModalRef, IEditDealModalProps>(
    function EditDealModalPage(props, ref) {
      return (
        <Provider>
          <EditDealModal {...props} ref={ref} />
        </Provider>
      );
    }
  )
);
