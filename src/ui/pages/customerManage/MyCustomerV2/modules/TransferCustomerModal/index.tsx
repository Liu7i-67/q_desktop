import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { Provider, useStore } from "./store/RootStore";
import { Modal } from "@/components/TXModal";
import {
  ITransferCustomerModalProps,
  ITransferCustomerModalRef,
} from "./interface";
import { forwardRef, useImperativeHandle } from "react";
import { Form, Spin } from "antd";
import { IUseMountFetchDataProps } from "@/components/TXSearchSelect";
import TXSearchUserSelect from "@/components/TXSearchSelect/modules/UserSelct";

const TransferCustomerModal = observer(
  forwardRef<ITransferCustomerModalRef, ITransferCustomerModalProps>(
    function TransferCustomerModal_(props, ref) {
      const root = useStore();
      useSyncProps(root, Object.keys(props), props);
      const { logic, computed, refs } = root;

      useImperativeHandle(ref, () => {
        return {
          openModal: logic.openModal,
          closeModal: logic.closeModal,
        };
      });

      const extraHookProps: Partial<IUseMountFetchDataProps> = {
        request: {
          userType: "CONSULTANT",
          numberOfCustomerAssignedTodayFlag: true,
        },
      };

      return (
        <Modal
          title="转移客户"
          open={logic.open}
          width={800}
          destroyOnClose
          onCancel={logic.closeModal}
          onOk={logic.handleConfirmTransferCustomer}
          okButtonProps={{
            loading: computed.confirmTransferCustomerLoading,
          }}
        >
          <Spin spinning={computed.confirmTransferCustomerLoading}>
            <Form form={refs.transferForm}>
              <div className="my-3">
                已选择{logic.initData?.targetCustomerIds?.length || 0}个客户
              </div>
              <Form.Item
                name="transferUserId"
                label=""
                rules={[{ required: true, message: "请选择转交人" }]}
              >
                <TXSearchUserSelect
                  className="w-full"
                  placeholder="请选择转移给谁"
                  extraHookProps={extraHookProps}
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
  forwardRef<ITransferCustomerModalRef, ITransferCustomerModalProps>(
    function TransferCustomerModalPage(props, ref) {
      return (
        <Provider>
          <TransferCustomerModal {...props} ref={ref} />
        </Provider>
      );
    }
  )
);
