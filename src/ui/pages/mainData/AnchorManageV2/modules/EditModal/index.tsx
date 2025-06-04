import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { Provider, useStore } from "./store/RootStore";
import { Modal } from "@/components/TXModal";
import { IEditModalProps, IEditModalRef } from "./interface";
import { forwardRef, useImperativeHandle } from "react";
import { Form, Input, Spin, Switch } from "antd";

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
        title={logic.initData ? "编辑主播" : "新增主播"}
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
              label="主播名称"
              name="streamerName"
              rules={[{ required: true, message: "请输入主播名称" }]}
            >
              <Input placeholder="请输入主播名称" />
            </Form.Item>

            <Form.Item
              label={"是否启用"}
              name="enableFlag"
              initialValue={true}
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>

            <Form.Item label="备注" name="memo">
              <Input.TextArea
                placeholder="请输入备注"
                maxLength={200}
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
