import { Form, Input, Switch } from "antd";
import { useSelector } from "./store";
import { useEffect } from "react";
import { Modal } from "@/components/TXModal";

const EditModal = () => {
  const { runUpdatePlatform, runSavePlatform } = useSelector((x) => x.api);
  const { isCreate, editModalVisible, updateModalData } = useSelector(
    (x) => x.state
  );
  const editForm = useSelector((x) => x.editForm);
  const FormItem = Form.Item;
  const { closeEditModal, addModalSubmit, updateModalSubmit } = useSelector(
    (x) => x.logic
  );

  useEffect(() => {
    if (editModalVisible) {
      if (!isCreate) {
        editForm.setFieldsValue({
          platformName: updateModalData.platformName,
          enableFlag: updateModalData.enableFlag,
          memo: updateModalData.memo,
        });
      }
    } else {
      editForm.resetFields();
    }
  }, [editModalVisible]);

  return (
    <Modal
      title={isCreate ? "新增平台" : "编辑平台"}
      open={editModalVisible}
      onCancel={closeEditModal}
      onOk={isCreate ? addModalSubmit : updateModalSubmit}
      width={500}
      destroyOnClose
      confirmLoading={
        isCreate ? runSavePlatform.loading : runUpdatePlatform.loading
      }
    >
      <Form
        className={"p-8 max-h-[60vh] overflow-y-auto"}
        layout="vertical"
        form={editForm}
      >
        <FormItem
          label="平台名称"
          name="platformName"
          rules={[{ required: true, message: "请输入平台名称" }]}
        >
          <Input placeholder="请输入平台名称" />
        </FormItem>

        <Form.Item
          label={"是否启用"}
          name="enableFlag"
          initialValue={false}
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <FormItem label="备注" name="memo">
          <Input.TextArea
            placeholder="请输入备注"
            maxLength={200}
            showCount
            rows={4}
            style={{ resize: "none" }}
          />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default EditModal;
