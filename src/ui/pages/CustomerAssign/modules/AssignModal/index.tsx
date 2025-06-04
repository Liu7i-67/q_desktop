import { Modal } from "@/components/TXModal";
import TXSearchSelect, {
  IUseMountFetchDataProps,
  useSearchSelectFetch,
} from "@/components/TXSearchSelect";
import { JudgeEnableFlag } from "@/utils/tools";
import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { Form, Spin } from "antd";
import { forwardRef, useImperativeHandle } from "react";
import { IAssignModalProps, IAssignModalRef } from "./interface";
import { Provider, useStore } from "./store/RootStore";
import TXSearchUserSelect from "@/components/TXSearchSelect/modules/UserSelct";

const AssignModal = observer(
  forwardRef<IAssignModalRef, IAssignModalProps>(
    function AssignModal_(props, ref) {
      const root = useStore();
      useSyncProps(root, Object.keys(props), props);
      const { logic, refs, computed } = root;

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
          title="客户指派"
          open={logic.open}
          width={800}
          destroyOnClose
          onOk={logic.onOk}
          onCancel={logic.closeModal}
        >
          <Spin spinning={computed.loading}>
            <Form
              className={"p-8"}
              layout={"vertical"}
              form={refs.assiginModalForm}
            >
              <Form.Item
                name="userId"
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
  forwardRef<IAssignModalRef, IAssignModalProps>(
    function AssignModalPage(props, ref) {
      return (
        <Provider>
          <AssignModal {...props} ref={ref} />
        </Provider>
      );
    }
  )
);
