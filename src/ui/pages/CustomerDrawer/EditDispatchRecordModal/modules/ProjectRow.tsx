import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Form, TreeSelect } from "antd";

export const ProjectRow = observer(function ProjectRow_() {
  const root = useStore();
  const { logic, refs } = root;
  return (
    <Form.Item
      label="派单项目"
      name="itemPostDTOList"
      rules={[{ required: true, message: "请选择派单项目" }]}
    >
      <TreeSelect
        placeholder="请选择派单项目"
        multiple
        treeData={logic.pojectTree}
        showSearch
        treeCheckable
        allowClear
        treeExpandAction="click"
        treeNodeFilterProp="title"
      />
    </Form.Item>
  );
});
