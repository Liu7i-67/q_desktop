import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Form, TreeSelect } from "antd";

export const OrgRow = observer(function OrgRow_() {
  const root = useStore();
  const { logic, refs } = root;
  const phoneNumber = Form.useWatch("phoneNumber", refs.form);

  return (
    <Form.Item
      label="派单机构"
      name="orgIdList"
      rules={[{ required: true, message: "请选择派单机构" }]}
    >
      <TreeSelect
        placeholder={phoneNumber ? "请选择派单机构" : "请先选择派单电话"}
        allowClear
        disabled={!logic.orgTree.length}
        multiple
        treeData={logic.orgTree}
        treeNodeFilterProp="title"
        showSearch
        treeCheckable
        treeExpandAction="click"
      />
    </Form.Item>
  );
});
