import { Modal } from "@/components/TXModal";
import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { Form, Input, Spin, Switch } from "antd";
import { forwardRef, useImperativeHandle } from "react";
import { IAddOrEditDictModalProps, IAddOrEditDictModalRef } from "./interface";
import { Provider, useStore } from "./store/RootStore";

const AddOrEditDictModal = observer(
  forwardRef<IAddOrEditDictModalRef, IAddOrEditDictModalProps>(
    function AddOrEditDictModal_(props, ref) {
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
          title={logic.initData?.id ? "编辑字典" : "新增字典"}
          open={logic.open}
          destroyOnClose
          onOk={logic.onOk}
          okButtonProps={{
            loading: computed.loading,
          }}
          onCancel={logic.closeModal}
        >
          <Spin spinning={computed.loading}>
            <Form className={"p-8"} layout={"vertical"} form={refs.form}>
              <Form.Item
                rules={[{ required: true, message: "字典编码为必填项" }]}
                label={"字典编码"}
                name={"dictCode"}
                key={"dictCode"}
              >
                <Input />
              </Form.Item>
              <Form.Item
                rules={[{ required: true, message: "字典名称为必填项" }]}
                label={"字典名称"}
                name={"dictName"}
                key={"dictName"}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={"是否启用"}
                name="enableFlag"
                initialValue={false}
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              <Form.Item label={"备注"} name={"memo"} key={"memo"}>
                <Input.TextArea
                  maxLength={100}
                  showCount={true}
                  rows={3}
                  style={{
                    resize: "none",
                  }}
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
  forwardRef<IAddOrEditDictModalRef, IAddOrEditDictModalProps>(
    function AddOrEditDictModalPage(props, ref) {
      return (
        <Provider>
          <AddOrEditDictModal {...props} ref={ref} />
        </Provider>
      );
    }
  )
);
