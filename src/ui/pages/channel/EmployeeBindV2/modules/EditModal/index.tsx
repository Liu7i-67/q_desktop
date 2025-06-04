import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { Provider, useStore } from "./store/RootStore";
import { Modal } from "@/components/TXModal";
import { IEditModalProps, IEditModalRef } from "./interface";
import { forwardRef, useImperativeHandle } from "react";
import { Form, Spin } from "antd";
import RelationItem from "./modules/RelationItem";
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

    return (
      <Modal
        title={logic.initData ? "编辑员工绑定" : "新增员工绑定"}
        open={logic.open}
        width={500}
        destroyOnClose
        onCancel={logic.closeModal}
        onOk={logic.handleSubmit}
        okButtonProps={{
          loading: computed.submitLoading,
        }}
      >
        <Spin spinning={computed.submitLoading}>
          <Form
            className={"p-8 max-h-[60vh] overflow-y-auto"}
            form={refs.editForm}
            layout={"vertical"}
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
              className={"w-full"}
            >
              <TXSearchUserSelect
                placeholder="请选择员工"
                disabled={logic.initData ? true : false}
              />
            </Form.Item>
            <RelationItem />
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
