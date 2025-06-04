import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { Provider, useStore } from "./store/RootStore";
import { Modal } from "@/components/TXModal";
import { IEditNicknameModalProps, IEditNicknameModalRef } from "./interface";
import { forwardRef, useImperativeHandle } from "react";
import { Form, Input } from "antd";
import TXEmployeePicker from "@/components/TXEmployeePicker";

const EditNicknameModal = observer(
  forwardRef<IEditNicknameModalRef, IEditNicknameModalProps>(
    function EditNicknameModal_(props, ref) {
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
          open={logic.open}
          width={600}
          title="修改别名"
          destroyOnClose
          onCancel={logic.closeModal}
          onOk={logic.onSubmit}
          confirmLoading={computed.loading}
        >
          <Form
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 16,
            }}
            form={refs.form}
            className="my-8"
          >
            <Form.Item name="nickname" label="别名">
              <Input placeholder="请输入别名" maxLength={50} />
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  )
);

export default observer(
  forwardRef<IEditNicknameModalRef, IEditNicknameModalProps>(
    function EditNicknameModalPage(props, ref) {
      return (
        <Provider>
          <EditNicknameModal {...props} ref={ref} />
        </Provider>
      );
    }
  )
);
