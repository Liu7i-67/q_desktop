import { Button, Form, Input, Select } from "antd";
import { useSelector } from "./store";
import { PlatformAuth } from "@/pages/mainData/platformManage/auth";
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
      className="mb-4"
      layout="inline"
      form={form}
      onReset={reset}
      onSearch={handleSearch}
      loading={runGetData.loading}
    >
      {PlatformAuth.platformCreate && (
        <Button type="primary" onClick={openEditModalCreate}>
          新增平台
        </Button>
      )}
      <FormItem label="平台名称" name="platformName">
        <Input placeholder="请输入平台名称" />
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
