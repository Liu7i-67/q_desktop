import TXSearchForm from "@/components/TXSearchForm";
import TXTreeSelect from "@/components/TXTreeSelect";
import { observer } from "@quarkunlimit/qu-mobx";
import { Button, Form, Input, Select } from "antd";
import { OrganizationAuth } from "../auth";
import { useStore } from "../store/RootStore";

export const SearchHeader = observer(function SearchHeader_() {
  const root = useStore();
  const { refs, logic, computed } = root;

  return (
    <TXSearchForm
      form={refs.form}
      onSearch={logic.onSearch}
      onReset={logic.onReset}
      loading={computed.loading}
    >
      {OrganizationAuth.organizationCreate && (
        <Button
          type="primary"
          onClick={() => {
            refs.editModalRef.current?.openModal({
              cityTree: logic.cityTree,
              orgType: logic.orgType,
            });
          }}
        >
          新增机构
        </Button>
      )}
      <Form.Item name="orgName" label="机构名称">
        <Input placeholder="请输入机构名称" />
      </Form.Item>

      <Form.Item name="areaCode" label="城市">
        <TXTreeSelect
          treeData={logic.cityTree}
          treeCheckable={false}
          treeExpandAction={undefined}
          placeholder="请选择城市"
          dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
          filterTreeNode={(inputValue, node) =>
            (node.title as string)
              .toLowerCase()
              .indexOf(inputValue.toLowerCase()) > -1
          }
        />
      </Form.Item>
      <Form.Item name="enableFlag" label="是否启用">
        <Select placeholder="请选择启用状态">
          <Select.Option value={true}>是</Select.Option>
          <Select.Option value={false}>否</Select.Option>
        </Select>
      </Form.Item>
    </TXSearchForm>
  );
});
