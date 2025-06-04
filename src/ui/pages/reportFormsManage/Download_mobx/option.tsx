import TXSearchForm from "@/components/TXSearchForm";
import { observer } from "@quarkunlimit/qu-mobx";
import { Form, Select } from "antd";
import { useStore } from "./store/RootStore";

const OPTIONS = {
  CUSTOMER_DEAL: "客户成交",
  LITTLE_RED_BOOK_COST: "小红书投放成本",
  LITTLE_RED_BOOK_COST_LEADS: "小红书投放成本—线索质量",
  LITTLE_RED_BOOK_RETENTION_INFORMATION: "小红书私信留资信息",
  A0001: "机构地区商务日表",
  A0002: "客户地区商务日表",
  A0003: "商务周表",
  A0004: "商务月表",
  B0001: "小红书分流表",
  B0002: "小红书投放监测表",
  B0003: "OA渠道客资监测表",
  C0001: "个人业绩明细表",
  C0002: "团队业绩明细表",
} as const;

const Option = observer(() => {
  const root = useStore();
  const { refs, logic, computed } = root;
  return (
    <TXSearchForm
      onReset={logic.onReset}
      onSearch={logic.onSearch}
      loading={computed.downloadListLoading}
      form={refs.searchForm}
    >
      <Form.Item label="导出目的" name="purpose" className="w-[260px]">
        <Select
          className="w-full"
          placeholder="请选择导出目的"
          options={Object.entries(OPTIONS).map(([key, value]) => ({
            label: value,
            value: key,
          }))}
        />
      </Form.Item>
    </TXSearchForm>
  );
});

export default Option;
