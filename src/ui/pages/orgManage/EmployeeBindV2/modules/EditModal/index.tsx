import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { Provider, useStore } from "./store/RootStore";
import { Modal } from "@/components/TXModal";
import { IEditModalProps, IEditModalRef } from "./interface";
import { forwardRef, useImperativeHandle } from "react";
import TXSearchSelect, {
  useSearchSelectFetch,
} from "@/components/TXSearchSelect";
import { Form, Spin } from "antd";
import TXSearchUserSelect from "@/components/TXSearchSelect/modules/UserSelct";

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

    const orgListProps = useSearchSelectFetch({
      fetchDataApi: "/api/base/v1/organization/get-page",
      searchParamKey: "orgName",
      request: {
        enableFlag: true,
      },
      transformOptions: (data) =>
        data.map((item) => ({
          label: item.orgName,
          value: item.id,
        })),
    });

    return (
      <Modal
        title={logic.initData ? "编辑员工绑定" : "新增员工绑定"}
        open={logic.open}
        destroyOnClose
        width={500}
        onCancel={logic.closeModal}
        onOk={logic.submitForm}
        okButtonProps={{
          loading: computed.submitLoading,
        }}
      >
        <Spin spinning={computed.submitLoading}>
          <Form
            className={"p-8 max-h-[60vh] overflow-y-auto"}
            form={refs.editForm}
            layout="vertical"
          >
            <Form.Item
              label="员工"
              name="userId"
              rules={[
                {
                  required: logic.initData ? false : true,
                  message: "请选择员工",
                },
              ]}
            >
              <TXSearchUserSelect
                placeholder="请选择员工"
                disabled={logic.initData ? true : false}
              />
            </Form.Item>

            <Form.Item
              label="机构"
              name="orgId"
              rules={[{ required: true, message: "请选择机构" }]}
            >
              <TXSearchSelect
                {...orgListProps}
                labelInValue
                mode="multiple"
                placeholder="请选择机构"
              />
            </Form.Item>
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
