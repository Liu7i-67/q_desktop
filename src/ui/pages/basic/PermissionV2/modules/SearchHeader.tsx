import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Form, Input } from "antd";
import TXSearchForm from "@/components/TXSearchForm";
import { ISearchInfo } from "../store/RootStore/interface";

export const SearchHeader = observer(function SearchHeader_() {
  const root = useStore();
  const { refs, logic } = root;

  return (
    <TXSearchForm
      form={refs.searchForm}
      onSearch={logic.onSearch}
      onReset={logic.onSearch}
    >
      <Form.Item name="menuName" label="权限名称">
        <Input placeholder="请输入权限名称" autoComplete="off" allowClear />
      </Form.Item>
    </TXSearchForm>
  );
});
