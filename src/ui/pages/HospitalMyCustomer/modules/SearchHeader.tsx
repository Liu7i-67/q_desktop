import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { DatePicker, Form, Input, Select } from "antd";
import TXSearchForm from "@/components/TXSearchForm";
import { ISearchInfo } from "../store/RootStore/interface";
import { dispatchStatusOptions } from "@/service/business/v1/customer-dispatch/customer-dispatch-page";

export const SearchHeader = observer(function SearchHeader_() {
  const root = useStore();
  const { logic } = root;

  return (
    <TXSearchForm
      onSearch={(e) => {
        logic.onSearch(e as ISearchInfo);
      }}
      onReset={() => {
        logic.onSearch({});
      }}
    >
      <Form.Item name="keyword" label="客户电话/微信">
        <Input placeholder="请输入客户电话/微信" />
      </Form.Item>
      <Form.Item name="dispatchTime" label="派单时间">
        <DatePicker.RangePicker
          format="YYYY-MM-DD"
          placeholder={["开始时间", "结束时间"]}
        />
      </Form.Item>
      <Form.Item name="dispatchStatusList" label="当前状态">
        <Select
          style={{
            minWidth: "150px",
          }}
          placeholder="请选择派单状态"
          mode="multiple"
          options={dispatchStatusOptions}
        />
      </Form.Item>
    </TXSearchForm>
  );
});
