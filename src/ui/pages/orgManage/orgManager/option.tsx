import { Button, Form, Input, Select, TreeSelect } from "antd";
import { useSelector } from "./store";
import { transformTreeData } from "@/utils/treeTransform";
import { OrganizationAuth } from "@/pages/orgManage/orgManager/auth";
import TXSearchForm from "@/components/TXSearchForm";

const Option = () => {
  const FormItem = Form.Item;
  const form = useSelector((x) => x.form);
  const { runGetData } = useSelector((x) => x.api);
  const { reset, openEditModalCreate, onSearch } = useSelector((x) => x.logic);
  const { regionTree } = useSelector((x) => x.state);

  return (
    <TXSearchForm
      form={form}
      onReset={reset}
      onSearch={onSearch}
      loading={runGetData.loading}
    >
      {OrganizationAuth.organizationCreate && (
        <Button type="primary" onClick={openEditModalCreate}>
          新增机构
        </Button>
      )}
      <FormItem name="orgName" label="机构名称">
        <Input placeholder="请输入机构名称" />
      </FormItem>

      <FormItem name="areaCode" label="城市">
        <TreeSelect
          showSearch
          dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
          placeholder="请选择城市"
          allowClear
          treeData={transformTreeData(regionTree)}
          filterTreeNode={(inputValue, node) =>
            (node.title as string)
              .toLowerCase()
              .indexOf(inputValue.toLowerCase()) > -1
          }
        />
      </FormItem>
      <FormItem name="enableFlag" label="是否启用">
        <Select style={{ width: 80 }}>
          <Select.Option value={true}>是</Select.Option>
          <Select.Option value={false}>否</Select.Option>
        </Select>
      </FormItem>
    </TXSearchForm>
  );
};

export default Option;
