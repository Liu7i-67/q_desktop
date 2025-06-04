import { Button, Form, Input, Select } from "antd";
import { useSelector } from "./store";
import { ProjectAuth } from "@/pages/mainData/projectManage/auth";
import TXSearchForm from "@/components/TXSearchForm";

const Option = () => {
  const FormItem = Form.Item;
  const form = useSelector((x) => x.form);
  const { runGetData } = useSelector((x) => x.api);
  const { reset, openEditModalCreate, onSearch } = useSelector((x) => x.logic);
  const {} = useSelector((x) => x.state);

  return (
    <TXSearchForm
      form={form}
      onReset={reset}
      onSearch={onSearch}
      loading={runGetData.loading}
    >
      {ProjectAuth.projectCreate && (
        <FormItem>
          <Button type="primary" onClick={openEditModalCreate}>
            新增项目
          </Button>
        </FormItem>
      )}
      <FormItem name="projectName" label="项目名称">
        <Input placeholder="请输入项目名称" />
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
