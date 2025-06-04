import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Form, Input, Button } from "antd";
import TXSearchForm from "@/components/TXSearchForm";
import { RoleAuth } from "../auth";

export const SearchHeader = observer(function SearchHeader_() {
  const root = useStore();
  const { refs, logic } = root;

  return (
    <TXSearchForm
      onSearch={logic.onSearch}
      onReset={logic.onSearch}
      form={refs.searchForm}
    >
      {RoleAuth.roleCreate && (
        <Form.Item>
          <Button
            type="primary"
            onClick={() => refs.editRef.current?.openModal()}
          >
            新增角色
          </Button>
        </Form.Item>
      )}
      <Form.Item label="角色名称" name="roleName">
        <Input placeholder="请输入角色名称" />
      </Form.Item>
    </TXSearchForm>
  );
});
