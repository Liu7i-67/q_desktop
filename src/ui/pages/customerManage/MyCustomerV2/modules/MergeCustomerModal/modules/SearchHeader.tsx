import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Form, Input } from "antd";
import TXSearchForm from "@/components/TXSearchForm";

export const SearchHeader = observer(function SearchHeader_() {
  const root = useStore();
  const { refs, logic, computed } = root;

  return (
    <TXSearchForm
      onSearch={logic.onMergeCustomerSearch}
      onReset={logic.onMergeCustomerReset}
      form={refs.mergeSearchForm}
      loading={computed.onMergeCustomerSearchLoading}
    >
      <Form.Item label="客户微信" name="wechatNumber">
        <Input
          placeholder="请输入微信查询客户"
          onChange={(e) => {
            refs.mergeSearchForm.setFieldsValue({
              wechatNumber: e.target?.value?.toLocaleLowerCase?.(),
            });
          }}
        />
      </Form.Item>
      <Form.Item label="客户电话" name="phoneNumber">
        <Input placeholder="请输入电话查询客户" />
      </Form.Item>
    </TXSearchForm>
  );
});
