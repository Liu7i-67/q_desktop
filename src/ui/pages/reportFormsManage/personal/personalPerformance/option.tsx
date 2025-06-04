import { Button, DatePicker, Form, Select } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useSelector } from "../store";
import TXSearchForm from "@/components/TXSearchForm";

const { RangePicker } = DatePicker;
const { Option } = Select;

const PanelForm = () => {
  const reportForm = useSelector((x) => x.reportForm);
  const { runGetReportPagination } = useSelector((x) => x.api);
  const { reportReset, onReportSearch } = useSelector((x) => x.logic);

  // 预设时间范围选项
  const timeRanges: Record<string, Dayjs[]> = {
    today: [dayjs().startOf("day"), dayjs().endOf("day")],
    yesterday: [
      dayjs().subtract(1, "day").startOf("day"),
      dayjs().subtract(1, "day").endOf("day"),
    ],
    last7Days: [
      dayjs().subtract(6, "day").startOf("day"),
      dayjs().endOf("day"),
    ],
    thisMonth: [dayjs().startOf("month"), dayjs().endOf("day")],
    lastMonth: [
      dayjs().subtract(1, "month").startOf("month"),
      dayjs().subtract(1, "month").endOf("month"),
    ],
  };

  // 处理预设范围选择变化
  const handleRangeChange = (value: string) => {
    reportForm.setFieldsValue({
      dateRange: timeRanges[value],
    });
  };

  return (
    <TXSearchForm
      form={reportForm}
      initialValues={{
        dateRange: [dayjs().startOf("day"), dayjs().endOf("day")],
        timeRangeSelect: "today",
      }}
      onReset={reportReset}
      onSearch={onReportSearch}
      loading={runGetReportPagination.loading}
    >
      <Form.Item label="时间跨度" className="mb-0">
        <Form.Item
          name="dateRange"
          className="inline-block"
          rules={[{ required: true, message: "请选择时间范围" }]}
        >
          <RangePicker
            // defaultValue={[dayjs().startOf('day'), dayjs().endOf('day')]}
            disabledDate={(current) => {
              return current && current > dayjs().startOf("day");
            }}
          />
        </Form.Item>
        <Form.Item name="timeRangeSelect" className="inline-block">
          <Select
            className="w-[120px]"
            onChange={handleRangeChange}
            placeholder="选择时间范围"
            allowClear
            // defaultValue={'today'}
          >
            <Option value="today">今天</Option>
            <Option value="yesterday">昨天</Option>
            <Option value="last7Days">近七天</Option>
            <Option value="thisMonth">当月</Option>
            <Option value="lastMonth">上月</Option>
          </Select>
        </Form.Item>
      </Form.Item>
    </TXSearchForm>
  );
};

export default PanelForm;
