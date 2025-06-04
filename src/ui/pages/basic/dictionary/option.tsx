import { Button, Form, Input } from "antd";
import { useSelector } from "@/pages/basic/dictionary/store";
import { DictAuth } from "@/pages/basic/dictionary/auth";
import TXSearchForm from "@/components/TXSearchForm";

const Option = () => {
  const FormItem = Form.Item;
  const form = useSelector((x) => x.form);
  const { runGetData } = useSelector((x) => x.api);
  const { handleSearch, reset, openAddModal } = useSelector((x) => x.logic);

  return (
    <TXSearchForm
      form={form}
      onReset={reset}
      onSearch={handleSearch}
      loading={runGetData.loading}
    >
      {DictAuth.dictCreate && (
        <Button type={"primary"} onClick={openAddModal}>
          新增字典
        </Button>
      )}
      <FormItem label={"字典编码"} name={"dictCode"} key={"dictCode"}>
        <Input placeholder={"清输入字典编码"} />
      </FormItem>
      <FormItem label={"字典名称"} name={"dictName"} key={"dictName"}>
        <Input placeholder={"清输入字典名称"} />
      </FormItem>
    </TXSearchForm>
  );
};
export default Option;
