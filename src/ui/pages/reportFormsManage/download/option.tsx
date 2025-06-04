import TXSearchForm from "@/components/TXSearchForm";
import { Form, Select } from "antd";
import { useSelector } from "./store";

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

const Option = () => {
  const FormItem = Form.Item;
  const form = useSelector((x) => x.form);
  const { runGetData } = useSelector((x) => x.api);
  const { reset, onSearch } = useSelector((x) => x.logic);

  return (
    <TXSearchForm
      onReset={reset}
      onSearch={onSearch}
      loading={runGetData.loading}
      form={form}
    >
      <FormItem label="导出目的" name="purpose" className="w-[260px]">
        <Select className="w-full" placeholder="请选择导出目的" allowClear>
          {Object.entries(OPTIONS).map(([value, label]) => (
            <Select.Option key={value} value={value}>
              {label}
            </Select.Option>
          ))}
        </Select>
      </FormItem>
    </TXSearchForm>
  );
};

export default Option;
