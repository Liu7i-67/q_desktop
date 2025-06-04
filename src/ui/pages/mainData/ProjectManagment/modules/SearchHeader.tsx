import TXSearchForm from "@/components/TXSearchForm";
import { observer } from "@quarkunlimit/qu-mobx";
import { Button, Form, Input, Select } from "antd";
import { ProjectManagementAuth } from "../auth";
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
      {ProjectManagementAuth.projectCreate && (
        <Button
          type="primary"
          onClick={() => {
            refs.editModalRef.current?.openModal({
              tree: refs.txTreeSidebarRef.current?.exportTreeData() ?? [],
              typeId: logic.typeId,
            });
          }}
        >
          新增项目
        </Button>
      )}
      <Form.Item name="projectName" label="项目名称">
        <Input placeholder="请输入项目名称" />
      </Form.Item>

      <Form.Item name="enableFlag" label="是否启用">
        <Select placeholder="请选择启用状态" style={{ width: 150 }}>
          <Select.Option value={true}>是</Select.Option>
          <Select.Option value={false}>否</Select.Option>
        </Select>
      </Form.Item>
    </TXSearchForm>
  );
});
