import { Button, Form, Input, Select } from "antd";
import { useSelector } from "./store";
import { LiveStreamerAuth } from "@/pages/mainData/anchorManage/auth";
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
      {LiveStreamerAuth.liveStreamerCreate && (
        <Button type="primary" onClick={openEditModalCreate}>
          新增主播
        </Button>
      )}
      <FormItem label="主播姓名" name="streamerName">
        <Input placeholder="请输入主播姓名" />
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
