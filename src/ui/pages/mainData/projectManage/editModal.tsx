import { Form, Input, Switch, TreeSelect } from "antd";
import { useSelector } from "./store";
import { useEffect } from "react";
import { processTreeData } from "@/utils/treeTransform";
import { Modal } from "@/components/TXModal";

const EditModal = () => {
  const FormItem = Form.Item;
  const editForm = useSelector((x) => x.editForm);
  const { runGetProjectDetail, runSaveProject, runUpdateProject } = useSelector(
    (x) => x.api
  );
  const { editModalVisible, isCreate, projectTypeTree } = useSelector(
    (x) => x.state
  );
  const {
    closeEditModal,
    addModalSubmit,
    updateModalSubmit,
    getProjectDetail,
  } = useSelector((x) => x.logic);

  useEffect(() => {
    if (editModalVisible) {
      if (!isCreate) {
        getProjectDetail();
      }
    } else {
      editForm.resetFields();
    }
  }, [editModalVisible]);

  return (
    <Modal
      title={isCreate ? "新增项目" : "编辑项目"}
      open={editModalVisible}
      onCancel={closeEditModal}
      onOk={isCreate ? addModalSubmit : updateModalSubmit}
      destroyOnClose
      width={600}
      confirmLoading={
        isCreate ? runSaveProject.loading : runUpdateProject.loading
      }
      loading={runGetProjectDetail.loading}
    >
      <Form
        className={"p-8 max-h-[60vh] overflow-y-auto"}
        form={editForm}
        layout="vertical"
      >
        <div className={"grid grid-cols-2 gap-x-4"}>
          <div className={"col-span-2 grid grid-cols-2 gap-4"}>
            <FormItem
              label="上级分类"
              name="typeId"
              rules={[{ required: true, message: "请选择上级分类" }]}
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
                treeData={processTreeData(projectTypeTree)}
              />
            </FormItem>
          </div>

          <FormItem
            label="项目名称"
            name="projectName"
            rules={[{ required: true, message: "请输入项目名称" }]}
          >
            <Input placeholder="请输入项目名称" />
          </FormItem>

          <FormItem
            label="项目编码"
            name="projectCode"
            rules={[{ required: true, message: "请输入项目编码" }]}
          >
            <Input placeholder="请输入项目编码" />
          </FormItem>

          <Form.Item
            label={"是否启用"}
            name="enableFlag"
            initialValue={false}
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <FormItem label="备注" name="memo" className={"col-span-2"}>
            <Input.TextArea
              placeholder="请输入备注信息"
              rows={4}
              maxLength={250}
              showCount
            />
          </FormItem>
        </div>
      </Form>
    </Modal>
  );
};

export default EditModal;
