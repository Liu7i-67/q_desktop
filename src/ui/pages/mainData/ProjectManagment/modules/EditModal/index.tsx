import { Modal } from "@/components/TXModal";
import TXTreeSelect from "@/components/TXTreeSelect";
import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { Form, Input, Spin, Switch } from "antd";
import { forwardRef, useImperativeHandle } from "react";
import { IEditModalProps, IEditModalRef } from "./interface";
import { Provider, useStore } from "./store/RootStore";

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
        title={logic.initData.recordId ? "编辑项目" : "新增项目"}
        open={logic.open}
        width={600}
        destroyOnClose
        onCancel={logic.closeModal}
        onOk={logic.onOk}
        okButtonProps={{
          loading: computed.loading,
        }}
      >
        <Spin spinning={computed.loading}>
          <Form
            className="p-8 max-h-[60vh] overflow-y-auto"
            form={refs.editForm}
            layout="vertical"
          >
            <div className={"grid grid-cols-2 gap-x-4"}>
              <div className={"col-span-2 grid grid-cols-2 gap-4"}>
                <Form.Item
                  label="上级分类"
                  name="typeId"
                  rules={[{ required: true, message: "请选择上级分类" }]}
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
              </div>

              <Form.Item
                label="项目名称"
                name="projectName"
                rules={[{ required: true, message: "请输入项目名称" }]}
              >
                <Input placeholder="请输入项目名称" />
              </Form.Item>

              <Form.Item
                label="项目编码"
                name="projectCode"
                rules={[{ required: true, message: "请输入项目编码" }]}
              >
                <Input placeholder="请输入项目编码" />
              </Form.Item>

              <Form.Item
                label={"是否启用"}
                name="enableFlag"
                initialValue={false}
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item label="备注" name="memo" className={"col-span-2"}>
                <Input.TextArea
                  placeholder="请输入备注信息"
                  rows={4}
                  maxLength={250}
                  showCount
                />
              </Form.Item>
            </div>
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
