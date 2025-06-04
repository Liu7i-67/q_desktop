import { Modal } from "@/components/TXModal";
import TXTreeSelect from "@/components/TXTreeSelect";
import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { Form, Input } from "antd";
import { forwardRef, useImperativeHandle } from "react";
import { IAddOrEditTypeModalProps, IAddOrEditTypeModalRef } from "./interface";
import { Provider, useStore } from "./store/RootStore";

const AddOrEditTypeModal = observer(
  forwardRef<IAddOrEditTypeModalRef, IAddOrEditTypeModalProps>(
    function AddOrEditTypeModal_(props, ref) {
      const root = useStore();
      useSyncProps(root, Object.keys(props), props);
      const { logic, refs, loadingStore } = root;

      useImperativeHandle(ref, () => {
        return {
          openModal: logic.openModal,
          closeModal: logic.closeModal,
        };
      });

      return (
        <Modal
          open={logic.open}
          width={500}
          destroyOnClose
          onCancel={logic.closeModal}
          onOk={logic.onOk}
          okButtonProps={{
            loading: loadingStore.get("onEdit") || loadingStore.get("onSave"),
          }}
        >
          <Form
            className={"p-8 max-h-[60vh] overflow-y-auto"}
            layout="vertical"
            form={refs.form}
          >
            <Form.Item
              label="上级分类"
              name="parentId"
              rules={[{ message: "请选择上级分类" }]}
            >
              <TXTreeSelect
                treeCheckable={false}
                treeExpandAction={undefined}
                placeholder="请选择上级分类"
                style={{ width: "100%" }}
                dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                fieldNames={{
                  label: "title",
                  value: "key",
                  children: "children",
                }}
                treeData={logic.initData.tree}
              />
            </Form.Item>

            <Form.Item
              label="部门名称"
              name="deptName"
              rules={[{ required: true, message: "请输入部门名称" }]}
            >
              <Input placeholder="请输入部门名称" />
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  )
);

export default observer(
  forwardRef<IAddOrEditTypeModalRef, IAddOrEditTypeModalProps>(
    function AddOrEditTypeModalPage(props, ref) {
      return (
        <Provider>
          <AddOrEditTypeModal {...props} ref={ref} />
        </Provider>
      );
    }
  )
);
