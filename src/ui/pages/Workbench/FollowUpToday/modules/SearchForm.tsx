import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import TXSearchForm from "@/components/TXSearchForm";
import { DatePicker, Form, Input, TreeSelect } from "antd";
import TXEmployeePicker, {
  maxTagPlaceholder,
  useTXEmployeePicker,
} from "@/components/TXEmployeePicker";
import { TXLowerCaseInput } from "@/components/TXForm/modules/TXLowerCaseInput";

export const SearchForm = observer(function SearchForm_() {
  const root = useStore();
  const { logic, computed, refs } = root;

  const userData = useTXEmployeePicker();

  return (
    <TXSearchForm
      onReset={logic.onReset}
      onSearch={logic.onSearch}
      loading={computed.loading}
      formKey="FOLLOW_UP_TODAY"
      form={refs.searchForm}
    >
      <Form.Item label={"所在部门"} name="deptIdList">
        <TreeSelect
          multiple
          maxTagCount={1}
          placeholder={"请选择部门"}
          treeData={logic.deptTree}
          allowClear
          maxTagPlaceholder={maxTagPlaceholder}
        />
      </Form.Item>

      <Form.Item label="员工" name="userIdList">
        <TXEmployeePicker
          multiple
          placeholder="请选择员工"
          className="!w-[300px]"
        />
      </Form.Item>

      <Form.Item label="跟进时间" name="followDate">
        <DatePicker.RangePicker format="YYYY-MM-DD" />
      </Form.Item>
      <Form.Item label="客户电话/微信" name="customerKeyword">
        <TXLowerCaseInput
          placeholder="请输入客户电话/微信"
          allowClear
          needTrim
        />
      </Form.Item>
    </TXSearchForm>
  );
});
