import { Button, Form, Input, TreeSelect } from "antd";
import { useSelector } from "./store";
import { useEffect } from "react";
import { getOrgTreeOptions } from "@/utils/treeTransform";

const Option = () => {
  const FormItem = Form.Item;
  const form = useSelector((x) => x.form);
  const { runGetData } = useSelector((x) => x.api);
  const { handleSearch, reset, openEditModalCreate, getOrgTree } = useSelector(
    (x) => x.logic
  );
  const { orgTree } = useSelector((x) => x.state);

  useEffect(() => {
    getOrgTree();
  }, []);

  return (
    <Form className="mb-4" layout="inline" form={form}>
      <FormItem>
        <Button type="primary" onClick={openEditModalCreate}>
          新增医生
        </Button>
      </FormItem>
      <FormItem label="医生姓名" name="doctorName">
        <Input placeholder="请输入医生姓名" />
      </FormItem>
      <FormItem label="执业编号" name="licenseNo">
        <Input placeholder="请输入医师执业编号" />
      </FormItem>
      <FormItem label="任职机构" name="orgIdList">
        <TreeSelect
          style={{ width: 240 }}
          placeholder="请选择任职机构"
          treeData={getOrgTreeOptions(orgTree)}
          showSearch
          treeNodeFilterProp="label"
          treeExpandAction="click"
        />
      </FormItem>
      <FormItem>
        <Button loading={runGetData.loading} onClick={reset}>
          重置
        </Button>
      </FormItem>
      <FormItem>
        <Button
          type="primary"
          loading={runGetData.loading}
          onClick={handleSearch}
        >
          搜索
        </Button>
      </FormItem>
      <style>
        {`
          .tree-node-disabled .ant-select-tree-node-content-wrapper {
            color: #000 !important;
          }
          .tree-node-selectable .ant-select-tree-node-content-wrapper {
            color: #000 !important;
          }
        `}
      </style>
    </Form>
  );
};

export default Option;
