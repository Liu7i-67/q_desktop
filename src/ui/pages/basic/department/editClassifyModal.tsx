import { Form, Input, TreeSelect } from "antd";
import { useSelector } from "./store";
import { Modal } from "@/components/TXModal";
import { useEffect } from "react";
import { processDepartmentTreeData } from "@/utils/treeTransform";

const EditClassifyModal = () => {
  const FormItem = Form.Item;
  const editClassifyForm = useSelector((x) => x.editClassifyForm);
  const { runSaveDepartmentType, runUpdateDepartmentType } = useSelector(
    (x) => x.api
  );
  const {
    editClassifyModalVisible,
    isCreateClassify,
    updateClassifyModalData,
    projectTypeTree,
  } = useSelector((x) => x.state);
  const {
    closeEditClassifyModal,
    saveDepartmentType,
    updateDepartmentType,
    setUpdateClassifyModalData,
  } = useSelector((x) => x.logic);

  useEffect(() => {
    if (editClassifyModalVisible) {
      // 编辑页面初始化
      if (isCreateClassify && updateClassifyModalData.key) {
        // 新增子节点
        editClassifyForm.setFieldsValue({
          deptName: "",
          parentId: updateClassifyModalData.key,
        });
      } else if (!isCreateClassify && updateClassifyModalData.key) {
        // 编辑本节点
        editClassifyForm.setFieldsValue({
          deptName: updateClassifyModalData.deptName,
          parentId: updateClassifyModalData.parentId
            ? updateClassifyModalData.parentId
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
      title={isCreateClassify ? "新增部门分类" : "编辑部门分类"}
      open={editClassifyModalVisible}
      onCancel={closeEditClassifyModal}
      onOk={isCreateClassify ? saveDepartmentType : updateDepartmentType}
      destroyOnClose
      width={500}
      confirmLoading={
        isCreateClassify
          ? runSaveDepartmentType.loading
          : runUpdateDepartmentType.loading
      }
    >
      <Form
        className={"p-8 max-h-[60vh] overflow-y-auto"}
        form={editClassifyForm}
        layout="vertical"
      >
        <FormItem
          label="子部门"
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
              label: "deptName",
              value: "key",
              children: "children",
            }}
            treeData={processDepartmentTreeData(projectTypeTree as any[])}
          />
        </FormItem>

        <FormItem
          label="部门名称"
          name="deptName"
          rules={[{ required: true, message: "请输入部门名称" }]}
        >
          <Input placeholder="请输入部门名称" />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default EditClassifyModal;
