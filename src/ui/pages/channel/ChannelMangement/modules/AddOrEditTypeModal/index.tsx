import { Modal } from "@/components/TXModal";
import TXTreeSelect from "@/components/TXTreeSelect";
import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { Form, Input, Spin } from "antd";
import { forwardRef, useImperativeHandle } from "react";
import { IAddOrEditTypeModalProps, IAddOrEditTypeModalRef } from "./interface";
import { Provider, useStore } from "./store/RootStore";

const AddOrEditTypeModal = observer(
  forwardRef<IAddOrEditTypeModalRef, IAddOrEditTypeModalProps>(
    function AddOrEditTypeModal_(props, ref) {
      const root = useStore();
      useSyncProps(root, Object.keys(props), props);
      const { logic, computed, refs } = root;

      useImperativeHandle(ref, () => {
        return {
          openModal: logic.openModal,
          closeModal: logic.closeModal,
        };
      });

      return (
        <Modal
          title={logic.initData?.isCreate ? "新增分类" : "编辑分类"}
          open={logic.open}
          width={500}
          destroyOnClose
          onOk={logic.onOk}
          onCancel={logic.closeModal}
          okButtonProps={{
            loading: computed.loading,
          }}
        >
          <Spin spinning={computed.loading}>
            <Form
              className={"p-8 max-h-[60vh] overflow-y-auto"}
              form={refs.form}
              layout="vertical"
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
                  treeData={logic.initData?.tree}
                />
              </Form.Item>

              <Form.Item
                label="分类名称"
                name="typeName"
                rules={[{ required: true, message: "请输入分类名称" }]}
              >
                <Input placeholder="请输入分类名称" />
              </Form.Item>

              <Form.Item label="备注" name="memo">
                <Input.TextArea
                  placeholder="请输入备注信息"
                  rows={4}
                  maxLength={250}
                  showCount
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
