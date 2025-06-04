import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { Provider, useStore } from "./store/RootStore";
import { Modal } from "@/components/TXModal";
import { IEditModalProps, IEditModalRef } from "./interface";
import { forwardRef, useImperativeHandle } from "react";
import { Form, Input, Spin } from "antd";

const EditModal = observer(
  forwardRef<IEditModalRef, IEditModalProps>(function EditModal_(props, ref) {
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
        title={logic.initData ? "编辑角色" : "新增角色"}
        open={logic.open}
        width={500}
        destroyOnClose
        onCancel={logic.closeModal}
        onOk={logic.onSubmit}
        okButtonProps={{
          loading: computed.submitLoading,
        }}
      >
        <Spin spinning={computed.submitLoading}>
          <Form
            className={"p-8 max-h-[60vh] overflow-y-auto"}
            layout="vertical"
            form={refs.editForm}
          >
            <Form.Item
              label="角色名称"
              name="roleName"
              rules={[{ required: true, message: "请输入角色名称" }]}
            >
              <Input placeholder="请输入角色名称" />
            </Form.Item>

            <Form.Item label="备注" name="memo">
              <Input.TextArea
                placeholder="请输入备注"
                maxLength={30}
                showCount
                rows={4}
                style={{ resize: "none" }}
              />
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    );
  })
);

export default observer(
  forwardRef<IEditModalRef, IEditModalProps>(
    function EditModalPage(props, ref) {
      return (
        <Provider>
          <EditModal {...props} ref={ref} />
        </Provider>
      );
    }
  )
);
