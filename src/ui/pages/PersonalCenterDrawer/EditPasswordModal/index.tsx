import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { Provider, useStore } from "./store/RootStore";
import { Modal } from "@/components/TXModal";
import { IEditPasswordModalProps, IEditPasswordModalRef } from "./interface";
import { forwardRef, useImperativeHandle } from "react";
import { Form, Input } from "antd";
import TXEmployeePicker from "@/components/TXEmployeePicker";

const EditPasswordModal = observer(
  forwardRef<IEditPasswordModalRef, IEditPasswordModalProps>(
    function EditPasswordModal_(props, ref) {
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
          title="修改密码"
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
            <Form.Item
              label="旧密码"
              name="oldPassword"
              rules={[{ required: true, message: "请输入旧密码" }]}
            >
              <Input.Password placeholder="请输入旧密码" />
            </Form.Item>
            <Form.Item
              label="新密码"
              name="newPassword"
              rules={[
                { required: true, message: "请输入新密码" },
                { min: 6, message: "密码长度不能小于6位" },
              ]}
            >
              <Input.Password placeholder="请输入新密码" />
            </Form.Item>
            <Form.Item
              label="确认密码"
              name="confirmPassword"
              dependencies={["newPassword"]}
              rules={[
                { required: true, message: "请确认新密码" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("两次输入的密码不一致"));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="请确认新密码" />
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  )
);

export default observer(
  forwardRef<IEditPasswordModalRef, IEditPasswordModalProps>(
    function EditPasswordModalPage(props, ref) {
      return (
        <Provider>
          <EditPasswordModal {...props} ref={ref} />
        </Provider>
      );
    }
  )
);
