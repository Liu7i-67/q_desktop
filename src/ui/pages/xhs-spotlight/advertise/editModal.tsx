import { Form, Input } from "antd";
import { Modal } from "@/components/TXModal";
import { useSelector } from "./store";

export default function EditModal() {
  const { editModalVisible, isCreate } = useSelector((x) => x.state);
  const { closeEditModal, updateAdvertiser, createAdvertiser } = useSelector(
    (x) => x.logic
  );
  const editForm = useSelector((x) => x.editForm);
  const { runUpdateAdvertiser, runSaveAdvertiser } = useSelector((x) => x.api);
  return (
    <Modal
      title={isCreate ? "新增广告主" : "编辑广告主"}
      open={editModalVisible}
      onCancel={closeEditModal}
      onOk={isCreate ? createAdvertiser : updateAdvertiser}
      confirmLoading={
        isCreate ? runSaveAdvertiser.loading : runUpdateAdvertiser.loading
      }
      destroyOnClose
    >
      <Form className={"p-8"} layout={"vertical"} form={editForm}>
        <Form.Item
          rules={[{ required: true, message: "请输入广告主名称" }]}
          name="advertiserName"
          label="广告主名称"
        >
          <Input placeholder="请输入广告主名称" />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "请输入广告主名称" }]}
          name="phoneNumber"
          label="手机号"
        >
          <Input placeholder="请输入手机号" />
        </Form.Item>
        <Form.Item name="memo" label="备注">
          <Input.TextArea
            placeholder="请输入备注"
            maxLength={200}
            showCount
            rows={4}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
