import { Modal } from "@/components/TXModal";
import ImageUpload from "@/utils/upload";
import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { Form, Input, Select, Spin } from "antd";
import { forwardRef, useImperativeHandle } from "react";
import type {
  IEditOrderStatusModalProps,
  IEditOrderStatusModalRef,
} from "./interface";
import { Provider, useStore } from "./store/RootStore";

const EditOrderStatusModal = observer(
  forwardRef<IEditOrderStatusModalRef, IEditOrderStatusModalProps>(
    function NGCascaderView_(props, ref) {
      const root = useStore();

      useSyncProps(root, Object.keys(props), props);

      const { logic, refs, computed } = root;

      useImperativeHandle(ref, () => {
        return {
          open: logic.open,
          onCancel: logic.onCancel,
        };
      });

      return (
        <Modal
          title={
            logic.defaultData.forceHandleFlag ? "修改派单状态" : "派单处理"
          }
          open={logic.visible}
          onCancel={logic.onCancel}
          onOk={logic.onOk}
          destroyOnClose
          okButtonProps={{
            loading: computed.editOrderStatusLoading,
          }}
          styles={{
            body: {
              paddingTop: "24px",
            },
          }}
        >
          <Spin spinning={computed.editOrderStatusLoading}>
            <Form form={refs.form} layout="vertical">
              <Form.Item
                label="派单状态"
                name="dispatchStatus"
                rules={[{ required: true, message: "请选择派单状态" }]}
              >
                <Select
                  placeholder="请选择派单状态"
                  options={[
                    {
                      label: "重单",
                      value: "REPEAT",
                      disabled: logic.initType === "REPEAT",
                    },
                    {
                      label: "不重单",
                      value: "NO_REPEAT",
                      disabled: logic.initType === "NO_REPEAT",
                    },
                  ]}
                  onChange={logic.selectChange}
                />
              </Form.Item>
              {logic.showUpload === "REPEAT" && (
                <Form.Item
                  rules={[{ required: true, message: "请上传重单截图" }]}
                  name="operateImg"
                  label="上传重单截图"
                >
                  <ImageUpload maxSize={10} maxCount={10} />
                </Form.Item>
              )}
              <Form.Item
                name="memo"
                label="机构跟进内容"
                rules={[{ required: true, message: "请输入跟进内容" }]}
              >
                <Input.TextArea
                  placeholder="请输入跟进内容"
                  rows={4}
                  maxLength={500}
                  showCount
                />
              </Form.Item>
            </Form>
          </Spin>
        </Modal>
      );
    }
  )
);

export default observer(
  forwardRef<IEditOrderStatusModalRef, IEditOrderStatusModalProps>(
    function EditOrderStatusModalPage(props, ref) {
      return (
        <Provider>
          <EditOrderStatusModal {...props} ref={ref} />
        </Provider>
      );
    }
  )
);
