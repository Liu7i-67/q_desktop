import { Form, Input } from "antd";
import { Modal } from "@/components/TXModal";
import { useSelector } from "./store";
import { useEffect } from "react";

const EditModal = () => {
  const { runUpdateRole, runSaveRole, runGetRoleDetail } = useSelector(
    (x) => x.api
  );
  const { isCreate, editModalVisible } = useSelector((x) => x.state);
  const editForm = useSelector((x) => x.editForm);
  const FormItem = Form.Item;
  const { closeEditModal, addModalSubmit, updateModalSubmit, getRoleDetail } =
    useSelector((x) => x.logic);

  useEffect(() => {
    if (editModalVisible) {
      if (!isCreate) {
        getRoleDetail();
      }
    } else {
      editForm.resetFields();
    }
  }, [editModalVisible]);

  return (
    <Modal
      title={isCreate ? "新增角色" : "编辑角色"}
      open={editModalVisible}
      onCancel={closeEditModal}
      onOk={isCreate ? addModalSubmit : updateModalSubmit}
      width={500}
      destroyOnClose
      confirmLoading={isCreate ? runSaveRole.loading : runUpdateRole.loading}
      loading={runGetRoleDetail.loading}
    >
      <Form
        className={"p-8 max-h-[60vh] overflow-y-auto"}
        layout="vertical"
        form={editForm}
      >
        <FormItem
          label="角色名称"
          name="roleName"
          rules={[{ required: true, message: "请输入角色名称" }]}
        >
          <Input placeholder="请输入角色名称" />
        </FormItem>

        <FormItem label="备注" name="memo">
          <Input.TextArea
            placeholder="请输入备注"
            maxLength={30}
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
