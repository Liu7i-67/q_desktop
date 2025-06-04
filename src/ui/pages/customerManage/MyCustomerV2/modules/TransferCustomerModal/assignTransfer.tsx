import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import {
  ITransferCustomerModalProps,
  ITransferCustomerModalRef,
} from "./interface";
import TXSearchSelect, {
  IUseMountFetchDataProps,
  useSearchSelectFetch,
} from "@/components/TXSearchSelect";
import { Provider, useStore } from "./store/RootStore";
import { Modal } from "@/components/TXModal";
import { forwardRef, useImperativeHandle } from "react";
import { Form, Spin } from "antd";
import { JudgeEnableFlag } from "@/utils/tools";
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
        transformOptions: (data) =>
          data.map((item) => ({
            label: item.userName,
            value: item.id,
            tips: `今日分配的客户数量
                            ${item.numberOfCustomerAssignedToday}`,
            disabled: JudgeEnableFlag(item),
            enableFlag: item.enableFlag,
            phoneNumber: item.phoneNumber,
          })),
        request: {
          userType: "CONSULTANT",
          numberOfCustomerAssignedTodayFlag: true,
        },
        refreshFetch: logic.open,
        initFetch: false,
      };

      return (
        <Modal
          title="转移客户"
          open={logic.open}
          width={800}
          destroyOnClose
          onOk={logic.handleConfirmTransferCustomer}
          onCancel={logic.closeModal}
          okButtonProps={{
            loading: computed.confirmTransferCustomerLoading,
          }}
        >
          <Spin spinning={computed.confirmTransferCustomerLoading}>
            <Form
              className={"p-8"}
              layout={"vertical"}
              form={refs.transferForm}
            >
              <Form.Item
                name="transferUserId"
                label="今日可排咨询师"
                rules={[{ required: true, message: "请选择咨询师" }]}
              >
                <TXSearchUserSelect
                  placeholder="请选择咨询师"
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
