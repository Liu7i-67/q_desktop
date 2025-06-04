import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { Provider, useStore } from "./store/RootStore";
import { Modal } from "@/components/TXModal";
import {
  IAdvertisingPlanManagementEditModalProps,
  IAdvertisingPlanManagementEditModalRef,
} from "./interface";
import { forwardRef, useImperativeHandle } from "react";
import { Form, Input } from "antd";
import TXEmployeePicker from "@/components/TXEmployeePicker";

const AdvertisingPlanManagementEditModal = observer(
  forwardRef<
    IAdvertisingPlanManagementEditModalRef,
    IAdvertisingPlanManagementEditModalProps
  >(function AdvertisingPlanManagementEditModal_(props, ref) {
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
        title="编辑广告计划"
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
            name="campaignName"
            label="广告计划名称"
            rules={[
              {
                required: true,
                message: "请输入广告计划名称",
              },
            ]}
          >
            <Input disabled placeholder="请输入" />
          </Form.Item>

          <Form.Item
            label="负责人"
            name="userId"
            rules={[
              {
                required: true,
                message: "请选择负责人",
              },
            ]}
          >
            <TXEmployeePicker
              type="OWNER_OF_THE_CUSTOMER"
              placeholder="请选择负责人"
            />
          </Form.Item>
        </Form>
      </Modal>
    );
  })
);

export default observer(
  forwardRef<
    IAdvertisingPlanManagementEditModalRef,
    IAdvertisingPlanManagementEditModalProps
  >(function AdvertisingPlanManagementEditModalPage(props, ref) {
    return (
      <Provider>
        <AdvertisingPlanManagementEditModal {...props} ref={ref} />
      </Provider>
    );
  })
);
