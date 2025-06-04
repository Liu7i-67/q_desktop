import { Form, Input, Switch } from "antd";
import { useSelector } from "@/pages/basic/dictionary/store";
import { Modal } from "@/components/TXModal";

const AddModal = () => {
  const state = useSelector((x) => x.state);
  const addForm = useSelector((x) => x.addForm);
  const FormItem = Form.Item;
  const { closeAddModal, addModalSubmit, editModalSubmit } = useSelector(
    (x) => x.logic
  );
  const { runSave, runUpdate } = useSelector((x) => x.api);
  const { addModalVisible, editDictId } = state;
  return (
    <Modal
      title={editDictId !== "" ? "编辑字典" : "新增字典"}
      open={addModalVisible}
      onCancel={closeAddModal}
      onOk={() => {
        editDictId === "" ? addModalSubmit() : editModalSubmit();
      }}
      confirmLoading={runSave.loading || runUpdate.loading}
    >
      <Form className={"p-8"} layout={"vertical"} form={addForm}>
        <FormItem
          rules={[{ required: true, message: "字典编码为必填项" }]}
          label={"字典编码"}
          name={"dictCode"}
          key={"dictCode"}
        >
          <Input />
        </FormItem>
        <FormItem
          rules={[{ required: true, message: "字典名称为必填项" }]}
          label={"字典名称"}
          name={"dictName"}
          key={"dictName"}
        >
          <Input />
        </FormItem>
        <FormItem
          label={"是否启用"}
          name="enableFlag"
          initialValue={false}
          valuePropName="checked"
        >
          <Switch />
        </FormItem>
        <FormItem label={"备注"} name={"memo"} key={"memo"}>
          <Input.TextArea maxLength={100} showCount={true} />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default AddModal;
