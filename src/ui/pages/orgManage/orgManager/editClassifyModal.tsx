import { Form, Input, TreeSelect } from "antd";
import { useSelector } from "./store";
import { useEffect } from "react";
import { convertToTreeData } from "@/utils/treeTransform";
import { Modal } from "@/components/TXModal";

const EditClassifyModal = () => {
  const FormItem = Form.Item;
  const editClassifyForm = useSelector((x) => x.editClassifyForm);
  const { runSaveOrgType, runUpdateOrgType } = useSelector((x) => x.api);
  const {
    editClassifyModalVisible,
    isCreateClassify,
    updateClassifyModalData,
    orgTypeTree,
  } = useSelector((x) => x.state);
  const {
    closeEditClassifyModal,
    saveOrgType,
    updateOrgType,
    setUpdateClassifyModalData,
  } = useSelector((x) => x.logic);

  useEffect(() => {
    if (editClassifyModalVisible) {
      // 编辑页面初始化
      if (isCreateClassify && updateClassifyModalData.key) {
        // 新增子节点
        editClassifyForm.setFieldsValue({
          typeName: "",
          memo: "",
          parentId: updateClassifyModalData.key,
        });
      } else if (!isCreateClassify && updateClassifyModalData.key) {
        // 编辑本节点
        editClassifyForm.setFieldsValue({
          typeName: updateClassifyModalData.title,
          memo: updateClassifyModalData.data.memo,
          parentId:
            updateClassifyModalData.data.parentId === 0
              ? updateClassifyModalData.data.parentId
              : null,
        });
      }
    } else {
      editClassifyForm.resetFields();
      setUpdateClassifyModalData({});
    }
  }, [editClassifyModalVisible]);

  return (
    <Modal
      title={isCreateClassify ? "新增分类" : "编辑分类"}
      open={editClassifyModalVisible}
      onCancel={closeEditClassifyModal}
      onOk={isCreateClassify ? saveOrgType : updateOrgType}
      destroyOnClose
      width={500}
      confirmLoading={
        isCreateClassify ? runSaveOrgType.loading : runUpdateOrgType.loading
      }
    >
      <Form
        className={"p-8 max-h-[60vh] overflow-y-auto"}
        form={editClassifyForm}
        layout="vertical"
      >
        <FormItem
          label="上级分类"
          name="parentId"
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
            treeData={convertToTreeData(orgTypeTree)}
          />
        </FormItem>

        <FormItem
          label="分类名称"
          name="typeName"
          rules={[{ required: true, message: "请输入分类名称" }]}
        >
          <Input placeholder="请输入分类名称" />
        </FormItem>

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

export default EditClassifyModal;
