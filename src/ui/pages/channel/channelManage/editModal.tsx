import { Form, Input, Switch, TreeSelect } from "antd";
import { useSelector } from "./store";
import { useEffect } from "react";
import { transformToTree } from "@/utils/treeTransform";
import { Modal } from "@/components/TXModal";

const EditModal = () => {
  const FormItem = Form.Item;
  const editForm = useSelector((x) => x.editForm);
  const { runGetChannelDetail, runSaveChannel, runUpdateChannel } = useSelector(
    (x) => x.api
  );
  const { editModalVisible, isCreate, channelTypeTree } = useSelector(
    (x) => x.state
  );
  const { closeEditModal, addModalSubmit, updateModalSubmit } = useSelector(
    (x) => x.logic
  );

  useEffect(() => {
    if (editModalVisible) {
    } else {
      editForm.resetFields();
    }
  }, [editModalVisible]);

  return (
    <Modal
      title={isCreate ? "新增渠道" : "编辑渠道"}
      open={editModalVisible}
      onCancel={closeEditModal}
      onOk={isCreate ? addModalSubmit : updateModalSubmit}
      destroyOnClose
      width={500}
      confirmLoading={
        isCreate ? runSaveChannel.loading : runUpdateChannel.loading
      }
      loading={runGetChannelDetail.loading}
    >
      <Form
        className={"p-8 max-h-[60vh] overflow-y-auto"}
        form={editForm}
        layout="vertical"
      >
        <FormItem
          label="上级分类"
          name="channelTypeId"
          rules={[{ message: "请选择上级分类" }]}
        >
          <TreeSelect
            showSearch
            style={{ width: "100%" }}
            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
            placeholder="请选择上级分类"
            allowClear
            fieldNames={{
              label: "title",
              value: "key",
              children: "children",
            }}
            treeData={transformToTree(channelTypeTree)}
          />
        </FormItem>

        <FormItem
          label="渠道名称"
          name="channelName"
          rules={[{ required: true, message: "请输入渠道名称" }]}
        >
          <Input placeholder="请输入渠道名称" />
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
            placeholder="请输入备注信息"
            rows={4}
            maxLength={250}
            showCount
          />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default EditModal;
