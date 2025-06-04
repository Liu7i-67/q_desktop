import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Form, Button } from "antd";
import TXSearchForm from "@/components/TXSearchForm";
import TXSearchUserSelect from "@/components/TXSearchSelect/modules/UserSelct";
import { EmployeeBindAuth } from "../auth";

export const SearchHeader = observer(function SearchHeader_() {
  const root = useStore();
  const { refs, logic } = root;

  return (
    <TXSearchForm
      onSearch={logic.onSearch}
      onReset={logic.onReset}
      form={refs.searchForm}
    >
      {EmployeeBindAuth.userOrgRelationCreate && (
        <Button
          type="primary"
          onClick={() => refs.editRef.current?.openModal()}
        >
          新增绑定
        </Button>
      )}
      <Form.Item label="员工" name="userId" className="max-w-[280px]">
        <TXSearchUserSelect allowDisabed placeholder="请选择员工" />
      </Form.Item>
    </TXSearchForm>
  );
});
