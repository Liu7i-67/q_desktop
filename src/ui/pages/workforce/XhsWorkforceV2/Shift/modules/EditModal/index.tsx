import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { Provider, useStore } from "./store/RootStore";
import { Modal } from "@/components/TXModal";
import { IEditModalProps, IEditModalRef } from "./interface";
import { forwardRef, useImperativeHandle } from "react";
import { Form, Input, Select, Spin } from "antd";
import TimeFormItem from "./modules/TimeFormItem";
import FrontendExtensionItem from "./modules/FrontendExtensionItem";

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
        title={logic.initData ? "编辑班次" : "新增班次"}
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
            initialValues={{ frontendExtension: "#3d7ce2" }}
          >
            <Form.Item
              label="班次名称"
              name="shiftName"
              rules={[{ required: true, message: "请输入班次名称" }]}
            >
              <Input placeholder="请输入班次名称" />
            </Form.Item>

            <Form.Item
              label="排班类型"
              name="scheduleType"
              rules={[{ required: true, message: "请选择排班类型" }]}
            >
              <Select
                placeholder="请选择排班类型"
                options={[{ label: "小红书排班", value: "LITTLE_RED_BOOK" }]}
              />
            </Form.Item>
            <TimeFormItem />
            <FrontendExtensionItem />
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
