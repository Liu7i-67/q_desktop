import { Modal } from "@/components/TXModal";
import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { Form, Select, Spin } from "antd";
import { forwardRef, useImperativeHandle } from "react";
import { IEditCustomerModalProps, IEditCustomerModalRef } from "./interface";
import LeadsTypeFormItem from "./modules/LeadsTypeFormItem";
import { Provider, useStore } from "./store/RootStore";

const EditCustomerModal = observer(
  forwardRef<IEditCustomerModalRef, IEditCustomerModalProps>(
    function EditCustomerModal_(props, ref) {
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
          title="编辑客户"
          open={logic.open}
          destroyOnClose
          onOk={logic.onOk}
          onCancel={logic.closeModal}
          okButtonProps={{
            loading: computed.loading,
          }}
          okText="提交"
        >
          <Spin spinning={computed.loading}>
            <Form
              className={"p-8 max-h-[60vh] overflow-y-auto"}
              layout={"vertical"}
              form={refs.editForm}
            >
              <Form.Item
                name="leadsType"
                label="来源渠道类型"
                rules={[
                  {
                    required: true,
                    message: "请选择渠道类型",
                  },
                ]}
              >
                <Select placeholder="请选择线索类型">
                  <Select.Option value="PLACE">投放</Select.Option>
                  <Select.Option value="ECOMMERCE">电商</Select.Option>
                </Select>
              </Form.Item>
              <LeadsTypeFormItem />
            </Form>
          </Spin>
        </Modal>
      );
    }
  )
);

export default observer(
  forwardRef<IEditCustomerModalRef, IEditCustomerModalProps>(
    function EditCustomerModalPage(props, ref) {
      return (
        <Provider>
          <EditCustomerModal {...props} ref={ref} />
        </Provider>
      );
    }
  )
);
