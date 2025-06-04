import { Modal } from "@/components/TXModal";
import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { Form, Input, Spin, Switch } from "antd";
import { forwardRef, useImperativeHandle } from "react";
import {
  IAddOrEditDictionaryValueModalProps,
  IAddOrEditDictionaryValueModalRef,
} from "./interface";
import { Provider, useStore } from "./store/RootStore";

const AddOrEditDictionaryValueModal = observer(
  forwardRef<
    IAddOrEditDictionaryValueModalRef,
    IAddOrEditDictionaryValueModalProps
  >(function AddOrEditDictionaryValueModal_(props, ref) {
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
        zIndex={2000}
        title={logic.initData.id ? "编辑字典值" : "新增字典值"}
        open={logic.open}
        destroyOnClose
        onCancel={logic.closeModal}
        onOk={logic.onOk}
        okButtonProps={{
          loading: computed.loading,
        }}
      >
        <Spin spinning={computed.loading}>
          <Form layout={"vertical"} className={"p-4"} form={refs.form}>
            <Form.Item label={"字典编码"} name="dictCode">
              <Input disabled={true} />
            </Form.Item>
            <Form.Item
              label={"字典名称"}
              name={"dictName"}
              rules={[{ required: true, message: "字典名称为必填项" }]}
            >
              <Input placeholder={"请输入字典名称"} />
            </Form.Item>
            <Form.Item
              label={"字典值"}
              name={"dictValue"}
              rules={[{ required: true, message: "字典值为必填项" }]}
            >
              <Input placeholder={"请输入字典值"} />
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
                placeholder={"清输入字典值备注"}
              />
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    );
  })
);

export default observer(
  forwardRef<
    IAddOrEditDictionaryValueModalRef,
    IAddOrEditDictionaryValueModalProps
  >(function AddOrEditDictionaryValueModalPage(props, ref) {
    return (
      <Provider>
        <AddOrEditDictionaryValueModal {...props} ref={ref} />
      </Provider>
    );
  })
);
