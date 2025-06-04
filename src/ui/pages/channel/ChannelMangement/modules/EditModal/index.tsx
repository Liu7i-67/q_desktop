import { Modal } from "@/components/TXModal";
import TXTreeSelect from "@/components/TXTreeSelect";
import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { Form, Input, Spin, Switch } from "antd";
import { forwardRef, useImperativeHandle } from "react";
import { IEditModalProps, IEditModalRef } from "./interface";
import { Provider, useStore } from "./store/RootStore";
import TXEmployeePicker from "@/components/TXEmployeePicker";

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
        title={logic.initData.recordId ? "编辑渠道" : "新增渠道"}
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
            form={refs.editForm}
            layout="vertical"
          >
            <Form.Item
              label="上级分类"
              name="channelTypeId"
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

            <Form.Item
              label="渠道名称"
              name="channelName"
              rules={[{ required: true, message: "请输入渠道名称" }]}
            >
              <Input placeholder="请输入渠道名称" />
            </Form.Item>
            <Form.Item
              label="负责人"
              name="managerUserIdList"
              rules={[{ required: true, message: "请选择" }]}
            >
              <TXEmployeePicker
                type="USER"
                multiple
                placeholder="请选择负责人"
                treeCheckable
              />
            </Form.Item>
            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                label={"是否启用"}
                name="enableFlag"
                initialValue={false}
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              <Form.Item
                label="是否建档"
                name="autoCreateCustomerFlag"
                initialValue={false}
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </div>

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
