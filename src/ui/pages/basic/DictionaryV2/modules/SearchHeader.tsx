import TXSearchForm from "@/components/TXSearchForm";
import { observer } from "@quarkunlimit/qu-mobx";
import { Button, Form, Input } from "antd";
import { DictionaryV2Auth } from "../auth";
import { useStore } from "../store/RootStore";

export const SearchHeader = observer(function SearchHeader_() {
  const root = useStore();
  const { refs, logic, computed } = root;

  return (
    <TXSearchForm
      form={refs.form}
      onReset={logic.onReset}
      onSearch={logic.onSearch}
      loading={computed.loading}
    >
      {DictionaryV2Auth.dictCreate && (
        <Button
          type={"primary"}
          loading={computed.loading}
          onClick={() => {
            logic.onOpenAddOrEditDictModal();
          }}
        >
          新增字典
        </Button>
      )}
      <Form.Item label={"字典编码"} name={"dictCode"} key={"dictCode"}>
        <Input placeholder={"清输入字典编码"} />
      </Form.Item>
      <Form.Item label={"字典名称"} name={"dictName"} key={"dictName"}>
        <Input placeholder={"清输入字典名称"} />
      </Form.Item>
    </TXSearchForm>
  );
});
