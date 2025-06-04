import { Form, Input, Switch } from "antd";
import { useSelector } from "./store";
import { useEffect } from "react";
import { Modal } from "@/components/TXModal";

const EditModal = () => {
  const { runUpdateAnchor, runSaveAnchor, runGetAnchorDetail } = useSelector(
    (x) => x.api
  );
  const { isCreate, editModalVisible } = useSelector((x) => x.state);
  const editForm = useSelector((x) => x.editForm);
  const FormItem = Form.Item;
  const { closeEditModal, addModalSubmit, updateModalSubmit, getAnchorDetail } =
    useSelector((x) => x.logic);

  useEffect(() => {
    if (editModalVisible) {
      !isCreate && getAnchorDetail();
    } else {
      editForm.resetFields();
    }
  }, [editModalVisible]);

  return (
    <Modal
      title={isCreate ? "新增主播" : "编辑主播"}
      open={editModalVisible}
      onCancel={closeEditModal}
      onOk={isCreate ? addModalSubmit : updateModalSubmit}
      width={500}
      destroyOnClose
      loading={runGetAnchorDetail.loading}
      confirmLoading={
        isCreate ? runSaveAnchor.loading : runUpdateAnchor.loading
      }
    >
      <Form
        className={"p-8 max-h-[60vh] overflow-y-auto"}
        layout="vertical"
        form={editForm}
      >
        <FormItem
          label="主播名称"
          name="streamerName"
          rules={[{ required: true, message: "请输入主播名称" }]}
        >
          <Input placeholder="请输入主播名称" />
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
