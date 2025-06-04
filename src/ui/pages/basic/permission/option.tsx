import { Button, Form, Input } from "antd";
import { useSelector } from "./store";
import TXSearchForm from "@/components/TXSearchForm";

const Option = () => {
  const tableSearchForm = useSelector((x) => x.tableSearchForm);
  const { handleSearchMenu } = useSelector((x) => x.logic);

  const FormItem = Form.Item;

  return (
    <TXSearchForm
      form={tableSearchForm}
      onSearch={handleSearchMenu}
      onReset={handleSearchMenu}
    >
      <FormItem name="menuName" label="权限名称">
        <Input placeholder="请输入权限名称" autoComplete="off" allowClear />
      </FormItem>
    </TXSearchForm>
  );
};
export default Option;
