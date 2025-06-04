import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { Provider, useStore } from "./store/RootStore";
import { Modal } from "@/components/TXModal";
import {
  IEditDispatchRecordModalProps,
  IEditDispatchRecordModalRef,
} from "./interface";
import { forwardRef, useImperativeHandle } from "react";
import { Form, Spin } from "antd";
import { PhoneRow } from "./modules/PhoneRow";
import { OrgRow } from "./modules/OrgRow";
import { ProjectRow } from "./modules/ProjectRow";
import { MemoRow } from "./modules/MemoRow";

const EditDispatchRecordModal = observer(
  forwardRef<IEditDispatchRecordModalRef, IEditDispatchRecordModalProps>(
    function EditDispatchRecordModal_(props, ref) {
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
          title="派单"
          open={logic.open}
          width={800}
          destroyOnClose
          onOk={logic.submit}
          onCancel={logic.closeModal}
          styles={{
            body: {
              maxHeight: "60vh",
              overflowY: "auto",
              padding: "32px",
            },
          }}
        >
          <Spin spinning={computed.loading}>
            <Form form={refs.form} layout="vertical" preserve={false}>
              <PhoneRow />
              <ProjectRow />
              <OrgRow />
              <MemoRow />
            </Form>
          </Spin>
        </Modal>
      );
    }
  )
);

export default observer(
  forwardRef<IEditDispatchRecordModalRef, IEditDispatchRecordModalProps>(
    function EditDispatchRecordModalPage(props, ref) {
      return (
        <Provider>
          <EditDispatchRecordModal {...props} ref={ref} />
        </Provider>
      );
    }
  )
);
