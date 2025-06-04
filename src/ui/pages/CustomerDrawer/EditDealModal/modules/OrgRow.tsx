import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Form, TreeSelect } from "antd";

export const OrgRow = observer(function OrgRow_() {
  const root = useStore();
  const { logic } = root;
  return (
    <Form.Item
      label="成交机构"
      name="orgId"
      rules={[{ required: true, message: "请选择成交机构" }]}
      className="flex-1"
    >
      <TreeSelect
        placeholder="请选择成交机构"
        treeData={logic.orgTree}
        showSearch
        treeNodeFilterProp="title"
        treeExpandAction="click"
      />
    </Form.Item>
  );
});
