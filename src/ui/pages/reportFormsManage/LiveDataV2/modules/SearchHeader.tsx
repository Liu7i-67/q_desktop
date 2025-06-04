import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Button, DatePicker, Form } from "antd";
import TXSearchForm from "@/components/TXSearchForm";
import { ISearchInfo } from "../store/RootStore/interface";
import dayjs from "dayjs";
import TXSearchSelect, {
  useSearchSelectFetch,
} from "@/components/TXSearchSelect";
import { maxTagPlaceholder } from "@/components/TXEmployeePicker";
import userHelper from "@/utils/user-helper";

export const SearchHeader = observer(function SearchHeader_() {
  const root = useStore();
  const { refs, logic, computed } = root;

  const userId = userHelper.getInstance().getUserId;

  const streamerProps = useSearchSelectFetch({
    fetchDataApi: "/api/base/v1/live-streamer/get-page",
    searchParamKey: "streamerName",
    transformOptions: (data) =>
      data.map((item) => ({ label: item.streamerName, value: item.id })),
  });

  return (
    <div className="mb-4">
      <TXSearchForm
        onSearch={(e) => logic.onSearch(e as ISearchInfo)}
        onReset={() =>
          logic.onSearch({ date: [dayjs().startOf("month"), dayjs()] })
        }
        initialValues={{
          date: [dayjs().startOf("month"), dayjs()],
        }}
      >
        <Form.Item label="筛选时间" name="date">
          <DatePicker.RangePicker
            disabledDate={(current) =>
              current && current > dayjs().endOf("day")
            }
          />
        </Form.Item>
        <Form.Item label="主播" name="liverStreamerIdList">
          <TXSearchSelect
            {...streamerProps}
            mode="multiple"
            placeholder="请选择主播"
            maxTagPlaceholder={maxTagPlaceholder}
          />
        </Form.Item>
      </TXSearchForm>
      {["1668201373050736640", "347893307260534818"].includes(userId) && (
        <Button
          className={"ml-4"}
          type={"primary"}
          onClick={logic.exportData}
          loading={computed.exportLoading}
        >
          导出
        </Button>
      )}
    </div>
  );
});
