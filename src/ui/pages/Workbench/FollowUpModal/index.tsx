import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { DatePicker, Form, Input, Modal } from "antd";
import { forwardRef, useImperativeHandle } from "react";
import type { IFollowUpModalProps, IFollowUpModalRef } from "./interface";
import { Provider, useStore } from "./store/RootStore";

const FollowUpModal = observer(
  forwardRef<IFollowUpModalRef, IFollowUpModalProps>(
    function FollowUpModal_(props, ref) {
      const root = useStore();
      useSyncProps(root, Object.keys(props), props);
      const { logic, refs, loadingStore } = root;

      useImperativeHandle(ref, () => {
        return {
          openModal: logic.openModal,
          closeModal: logic.closeModal,
        };
      });

      return (
        <Modal
          title="客户跟进"
          open={logic.open}
          width={600}
          loading={loadingStore.get("onSaveCustomerFollow")}
          onOk={logic.onOk}
          maskClosable={false}
          onCancel={logic.closeModal}
        >
          <Form className="mt-4" layout="vertical" form={refs.followUpForm}>
            <Form.Item
              label="跟进内容"
              name="memo"
              rules={[{ required: true, message: "请输入跟进内容" }]}
            >
              <Input.TextArea
                placeholder="请输入跟进内容"
                autoSize={false}
                rows={4}
                maxLength={200}
                showCount
                style={{ resize: "vertical" }}
              />
            </Form.Item>
            <Form.Item
              label="下次跟进时间"
              name="nextDate"
              rules={[{ required: true, message: "请选择下次跟进时间" }]}
            >
              <DatePicker
                disabledDate={(current) => {
                  return (
                    current && current.startOf("day").valueOf() <= Date.now()
                  );
                }}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  )
);

export default observer(
  forwardRef<IFollowUpModalRef, IFollowUpModalProps>(
    function FollowUpModalPage(props, ref) {
      return (
        <Provider>
          <FollowUpModal {...props} ref={ref} />
        </Provider>
      );
    }
  )
);

export * from "./interface";
