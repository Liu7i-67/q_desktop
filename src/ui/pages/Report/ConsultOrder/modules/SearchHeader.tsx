import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { DatePicker, Form, Input } from "antd";
import TXSearchForm from "@/components/TXSearchForm";
import { ISearchInfo } from "../store/RootStore/interface";
import dayjs from "dayjs";
import TXSearchUserSelect from "@/components/TXSearchSelect/modules/UserSelct";
import { IUseMountFetchDataProps } from "@/components/TXSearchSelect";
import { maxTagPlaceholder } from "@/components/TXEmployeePicker";

export const SearchHeader = observer(function SearchHeader_() {
  const root = useStore();
  const { refs, logic } = root;

  const extraHookProps: Partial<IUseMountFetchDataProps> = {
    request: {
      userType: "CONSULTANT",
      numberOfCustomerAssignedTodayFlag: true,
    },
    transformOptions: (data) =>
      data.map((item) => ({
        label: item.userName,
        value: item.id,
        enableFlag: item.enableFlag,
        phoneNumber: item.phoneNumber,
        tips: `今日分配的客户数量 ${item.numberOfCustomerAssignedToday}`,
      })),
  };

  return (
    <TXSearchForm
      onSearch={(e) => {
        logic.onSearch(e as ISearchInfo);
      }}
      formKey="CONSULT_ORDER_FORM"
      onReset={() => {
        logic.onSearch({});
      }}
    >
      <Form.Item label="接单时间" name="assignTime">
        <DatePicker.RangePicker
          format="YYYY-MM-DD"
          disabledDate={(current) => current && current >= dayjs().endOf("day")}
        />
      </Form.Item>
      <Form.Item label="咨询师" name="idList">
        <TXSearchUserSelect
          className="!w-[360px]"
          placeholder="请选择咨询师"
          mode="multiple"
          maxTagTextLength={12}
          maxTagPlaceholder={maxTagPlaceholder}
          extraHookProps={extraHookProps}
        />
      </Form.Item>
    </TXSearchForm>
  );
});
