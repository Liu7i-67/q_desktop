import { Button, DatePicker, Form } from "antd";
import TXSearchForm from "@/components/TXSearchForm";
import { useSelector } from "@/pages/reportFormsManage/liveData/store";
import { useMount } from "@quarkunlimit/react-hooks";
import dayjs from "dayjs";
import userHelper from "@/utils/user-helper";
import TXSearchSelect, {
  useSearchSelectFetch,
} from "@/components/TXSearchSelect";
import { maxTagPlaceholder } from "@/components/TXEmployeePicker";

const userId = userHelper.getInstance().getUserId;

const Option = () => {
  const FormItem = Form.Item;
  const { RangePicker } = DatePicker;

  const form = useSelector((x) => x.form);
  const { getTableData, handleReset, handleExport } = useSelector(
    (x) => x.logic
  );

  const { runExportData } = useSelector((x) => x.api);

  useMount(() => {
    getTableData();
  });

  const streamerProps = useSearchSelectFetch({
    fetchDataApi: "/api/base/v1/live-streamer/get-page",
    searchParamKey: "streamerName",
    transformOptions: (data) =>
      data.map((item) => ({ label: item.streamerName, value: item.id })),
  });

  return (
    <div className={"mb-4"}>
      <TXSearchForm
        onReset={() => {
          handleReset();
        }}
        onSearch={() => {
          getTableData();
        }}
        className={""}
        form={form}
        initialValues={{
          date: [dayjs().startOf("month"), dayjs()],
        }}
      >
        <FormItem label={"筛选时间："} name={"date"}>
          <RangePicker
            disabledDate={(current) =>
              current && current > dayjs().endOf("day")
            }
          />
        </FormItem>
        <FormItem label={"主播："} name={"liverStreamerIdList"}>
          <TXSearchSelect
            {...streamerProps}
            mode="multiple"
            placeholder="请选择主播"
            maxTagPlaceholder={maxTagPlaceholder}
          />
        </FormItem>
      </TXSearchForm>
      {["1668201373050736640", "347893307260534818"].includes(userId) && (
        <Button
          className={"ml-4"}
          type={"primary"}
          onClick={handleExport}
          loading={runExportData.loading}
        >
          导出
        </Button>
      )}
    </div>
  );
};

export default Option;
