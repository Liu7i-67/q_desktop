import { Button, Form, Input } from "antd";
import { useSelector } from "./store";
import { RoleAuth } from "@/pages/basic/role/auth";
import TXSearchForm from "@/components/TXSearchForm";

const Option = () => {
  const FormItem = Form.Item;
  const form = useSelector((x) => x.form);
  const { runGetData } = useSelector((x) => x.api);
  const { handleSearch, reset, openEditModalCreate } = useSelector(
    (x) => x.logic
  );

  return (
    <TXSearchForm
      form={form}
      onReset={reset}
      onSearch={handleSearch}
      loading={runGetData.loading}
    >
      {RoleAuth.roleCreate && (
        <Button type="primary" onClick={openEditModalCreate}>
          新增角色
        </Button>
      )}
      <FormItem label="角色名称" name="roleName">
        <Input placeholder="请输入角色名称" />
      </FormItem>
    </TXSearchForm>
  );
};

export default Option;
