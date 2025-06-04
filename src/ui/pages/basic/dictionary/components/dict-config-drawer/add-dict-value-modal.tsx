import { Form, Input, Switch } from "antd";
import { useSelector } from "@/pages/basic/dictionary/store";
import { Modal } from "@/components/TXModal";

const AddDictValueModal = () => {
  const state = useSelector((x) => x.state);
  const { closeDictValueModal, addDictValue, editDictValue } = useSelector(
    (x) => x.logic
  );
  const FormItem = Form.Item;
  const addDictValueForm = useSelector((x) => x.addDictValueForm);
  const { addDictValueModalVisible, currentEditCode, editDictValueId } = state;
  const { runUpdateDictValue, runSaveDictValue } = useSelector((x) => x.api);

  return (
    <Modal
      zIndex={2000}
      open={addDictValueModalVisible}
      title={editDictValueId === "" ? "新增字典值" : "编辑字典值"}
      onCancel={closeDictValueModal}
      onOk={() => {
        editDictValueId == "" ? addDictValue() : editDictValue();
      }}
      confirmLoading={runSaveDictValue.loading || runUpdateDictValue.loading}
    >
      <Form layout={"vertical"} className={"p-4"} form={addDictValueForm}>
        <FormItem label={"字典编码"}>
          <Input disabled={true} value={currentEditCode} />
        </FormItem>
        <FormItem
          label={"字典名称"}
          name={"dictName"}
          key={"dictName"}
          rules={[{ required: true, message: "字典名称为必填项" }]}
        >
          <Input placeholder={"请输入字典名称"} />
        </FormItem>
        <FormItem
          label={"字典值"}
          name={"dictValue"}
          key={"dictValue"}
          rules={[{ required: true, message: "字典值为必填项" }]}
        >
          <Input placeholder={"请输入字典值"} />
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
          <Input.TextArea
            maxLength={100}
            showCount={true}
            placeholder={"清输入字典值备注"}
          />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default AddDictValueModal;
